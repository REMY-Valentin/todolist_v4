<?php
namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api")
 */
class TodoController extends AbstractController
{
    /**
     * @Route("/{id}", name="get-todo")
     */
    public function ReadTodo(int $id, User $user) {
        

        $userTodos = $user->getTodos();
        
        dd($userTodos[0]);
        return $this->json($userTodos, 200);
    }
}