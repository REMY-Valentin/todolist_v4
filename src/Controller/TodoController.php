<?php
namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;

/**
 * @Route("/api")
 */
class TodoController extends AbstractController
{
    /**
     * @Route("/{id}", name="get-todo")
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
}