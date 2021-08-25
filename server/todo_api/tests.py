from django.test import TestCase
from .models import Todo
from users.models import NewUser

class Test_Create_Todo(TestCase):

    @classmethod
    def setUpTestData(cls):
        testuser = NewUser.objects.create(email="test@test.com", user_name="test", first_name="test", password="qweqweqwe")
        test_todo = Todo.objects.create(title="Sample", creator=NewUser.objects.get(id=1), description="Sample")

    def test_todo_content(self):
        user = NewUser.objects.get(id=1)
        todo = Todo.objects.get(id=1)
        firstName = f'{user.first_name}'
        title = f'{todo.title}'
        creator = f'{todo.creator}'
        description = f'{todo.description}'

        self.assertEqual(firstName, 'test')
        self.assertEqual(title, 'Sample')
        self.assertEqual(creator, 'test')
        self.assertEqual(description, 'Sample')
        self.assertEqual(str(todo), 'Sample')
