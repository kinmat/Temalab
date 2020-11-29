using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ToDoList.Models
{
    public class Tasks
    {
        public Tasks()
        {

        }
        public Tasks(String title=null,String cr=null, DateTime dt=new DateTime(),String dc=null)
        {
            Title = title;
            CurrState = cr;
            DueDate = dt;
            Description = dc;
        }
        public int Id { get; set; }
        public String Title { get; set; }
        public String CurrState { get; set; }
        public DateTime? DueDate { get; set; }
        public String Description { get; set; }
    }
}
