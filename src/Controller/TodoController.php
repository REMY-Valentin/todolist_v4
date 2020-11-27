<?php
namespace App\Controller;

use App\Entity\Todo;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

/**
 * @Route("/api")
 */
class TodoController extends AbstractController
{
    /**
     * @Route("/{id}", name="get-todo", methods={"GET"})
     */
    public function ReadTodo(int $id, User $user, SerializerInterface $serializer) {
        

        $userTodos = $user->getTodos()->toArray();
        //dump($userTodos[1]);
        $dataToSend = [];
        for($i=0; $i < count($userTodos); $i++) {
            //dump($userTodos[$i]->getId());
            $dataToSend[] = [$userTodos[$i]->getId(), $userTodos[$i]->getName(), $userTodos[$i]->getCategory(), $userTodos[$i]->getStatus(), $userTodos[$i]->getCompletion()];
        }
        //dump($dataToSend);
       
        return $this->json($dataToSend, 200);
    }

    /**
     * @Route("/{id}/add", name="add-todo")
     */
    public function AddTodo(int $id, User $user, Request $request, SerializerInterface $serializer, EntityManagerInterface $em, ValidatorInterface $validator) {
        
        $data = $request->getContent();
        
        $todo = new Todo;
        $todo = $serializer->deserialize($data, Todo::class, 'json');
        $todo->setUser($user);
        $error = $validator->validate($todo);
        if (count($error) > 0) {
            return $this->json($error, 400);
        }
        $em->persist($todo);
        $em->flush();
       
        return $this->json($todo->getId(), 200);
    }

    /**
     * @Route("/{id}/update", name="update-todo")
     */
    public function UpdateTodo(int $id, User $user, Request $request,  SerializerInterface $serializer, ValidatorInterface $validator, EntityManagerInterface $em) {

        $data = $request->getContent();
        $decodeData = json_decode($data);
        //dd($data);
        
        $todo = $this->getDoctrine()
            ->getRepository(Todo::class)
            ->find($decodeData->id);
        
        //dump($todo);
        $serializer->deserialize($data, Todo::class, 'json', [AbstractNormalizer::OBJECT_TO_POPULATE => $todo]);
        //dd($decodeData, $todo);
        $error = $validator->validate($todo);
        if (count($error) > 0) {
            return $this->json($error, 400);
        }
        $em->flush();

        return $this->json(200);
    }

    /**
     * @Route("/{id}/delete", name="delete-todo")
     */
    public function DeleteTodo(int $id, User $user, Request $request, EntityManagerInterface $em) {
        
        $data = $request->getContent();
        $decodeData = json_decode($data);

        $todo = $this->getDoctrine()
            ->getRepository(Todo::class)
            ->find($decodeData->id);
        
        $em->remove($todo);
        $em->flush();
        
        return $this->json(200);
    }
}