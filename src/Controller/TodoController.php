<?php

namespace App\Controller;

use App\Entity\Todo;
use App\Repository\TodoRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/todo", name="api_todo")
 */
class TodoController extends AbstractController
{
    private $entityManager;
    private $todoRepository;
    public function __construct(EntityManagerInterface $entityManager, TodoRepository $todoRepository)
    {
        $this->entityManager = $entityManager;
        $this->todoRepository = $todoRepository;

    }
    /**
     * @Route("/read", name="api_todo_read")
     */
    public function index()
    {
        $todos = $this->todoRepository->findAll();
        $arrayOfTodos = [];
        foreach ($todos as $todo){
            $arrayOfTodos[] = $todo->toArray();
        }
        return $this->json($arrayOfTodos);
    }

    /**
     * @Route("/create", name="api_todo_create", methods={"POST"})
     */
    public function create(Request $request)
    {
        $content = json_decode($request->getContent());
        
        $todo = new Todo();

        $todo->setName($content->name);

        try {
            $this->entityManager->persist($todo);
            $this->entityManager->flush();
            return $this->json([
                'todo' => $todo->toArray(),
            ]);
        } catch (\Throwable $th) {
            
        }
    }

    /**
     * @Route("/update/{id}", name="api_todo_update", methods={"PUT"})
     */
    public function update(Request $request, Todo $todo)
    {
        $content = json_decode($request->getContent());

        $todo->setName($content->name);

        try {
            $this->entityManager->flush();
            return $this->json([
                'todo' => $todo->toArray(),
            ]);
        } catch (\Throwable $th) {
            
        }
    }

    /**
     * @Route("/delete/{id}", name="api_todo_delete", methods={"DELETE"})
     */
    public function delete(Todo $todo)
    {
        try {
            $this->entityManager->remove($todo);
            $this->entityManager->flush();
        } catch (\Throwable $th) {
            
        }
        return $this->json([
            'message' => 'Todo has been deleted',
        ]);
    }
}
