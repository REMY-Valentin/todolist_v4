<?php

namespace App\Controller;

use App\Entity\Category;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

/**
 * @Route("/api/category")
 */
class CategoryController extends AbstractController
{
    /**
     * @Route("/{id}", name="get-category")
     */
    public function getCategory(int $id,User $user, Request $request)
    {
        $userCat = $user->getCategories()->toArray();
        //$categories = $user->getCategories()->getName;
        $dataToSend = [];
        for($i=0; $i < count($userCat); $i++) {
            //dump($userTodos[$i]->getId());
            $dataToSend[] = $userCat[$i]->getName();
        }
        
       
        return $this->json($dataToSend, 200);
    }

    /**
     * @Route("/{id}/add", name="add-category")
     */
    public function add(int $id, User $user ,Request $request, SerializerInterface $serializer, EntityManagerInterface $em, ValidatorInterface $validator): Response
    {
        $category = new Category;
        $data = $request->getContent();
        $category = $serializer->deserialize($data, Category::class, 'json');
        $category->setUser($user);
        
        $error = $validator->validate($category);
        if (count($error) > 0) {
            return $this->json($error, 400);
        }
        //dd($error);
        $em->persist($category);
        $em->flush();

        return $this->json(200);
    }

    /**
     * @Route("/{id}/update", name="update-category")
     */
    public function update(int $id, User $user, Request $request, SerializerInterface $serializer, EntityManagerInterface $em, ValidatorInterface $validator): Response
    {
        $data = json_decode($request->getContent());
        $category = $user->getCategories()->get($data->id);
        // dd($data, $categoryId);
        $user->removeCategory($category);
        $em->flush();
        
        return $this->json(200);
    }

    /**
     * @Route("/{id}/delete", name="delete-category")
     */
    public function delete(int $id, Request $request, EntityManagerInterface $em)
    {
        $data = json_decode($request->getContent());

        $category =$this->getDoctrine()
            ->getRepository(Category::class)
            ->find($data->id);

        $em->remove($category);
        $em->flush();

        return $this->json(200);

    }
}
