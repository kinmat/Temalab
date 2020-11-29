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
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public async Task Test1()
        {

            var options = new DbContextOptionsBuilder<TaskContext>().UseInMemoryDatabase(databaseName: "MockTaskList").Options;

            using (var context = new TaskContext(options))
            {
                context.Tasks.Add(new Tasks("Cim", "Done", new DateTime(), "Leiras"));
                context.Tasks.Add(new Tasks("Cim2", "Pending", new DateTime(), "Leiras2"));
                context.SaveChanges();
            }
            
            using (var context = new TaskContext(options))
            {
                TasksController controller = new TasksController(context);
                var result = await controller.GetTasks(1);
                var actualResult = result.Value;

                Assert.AreEqual("Cim", ((Tasks)actualResult).Title);
            }
            
        }

    }
}