<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;



class baseController extends AbstractController
{
    /**
     * @Route("/", name="todo")
     */
    public function base() 
    {
        $userEntity = $this->getUser();
        $user = ['id'=> $userEntity->getId(), 'email' => $userEntity->getEmail()];
        //dump($user);
        return $this->render('todo.html.twig', ['user'=> $user ]);
    }
}