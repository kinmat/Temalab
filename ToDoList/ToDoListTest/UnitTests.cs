using System;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using ToDoList.Data;
using ToDoList.Models;
using ToDoList.Controllers;
using System.Threading.Tasks;


namespace ToDoListTest
{
    public class Tests
    {
        DbContextOptions<TaskContext> options;

        [SetUp]
        public void Setup()
        {
            options = new DbContextOptionsBuilder<TaskContext>().UseInMemoryDatabase(databaseName: "MockTaskList").Options;
        }

        [Test]
        public async Task GetTest()
        {
            
            using (var context = new TaskContext(options))
            {
                context.Tasks.Add(new Tasks("Cim", "Done", new DateTime(), "Leiras"));
                context.Tasks.Add(new Tasks("Cim2", "Pending", new DateTime(), "Leiras2"));
                context.SaveChanges();
                TasksController controller = new TasksController(context);
                var result = await controller.GetTasks(1);
                var actualResult = result.Value;

                Assert.AreEqual("Cim", ((Tasks)actualResult).Title);
            }
            
        }

        [Test]
        public async Task PostTest()
        {
            using (var context = new TaskContext(options))
            {
                Tasks newTask = new Tasks("PostCim", "Done", new DateTime(), "Leiras");
                TasksController controller = new TasksController(context);
                var result = await controller.PostTasks(newTask);
                var actualResult = result.Value;
                Assert.AreEqual("PostCim", context.Tasks.Find(3).Title);
            }

        }

    }
}