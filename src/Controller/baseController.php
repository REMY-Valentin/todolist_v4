<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class baseController extends AbstractController
{
    /**
     * @Route("/")
     */
    public function base() 
    {
        return $this->render('base.html.twig');
    }
}