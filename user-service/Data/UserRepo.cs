using UserService.Models;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;

namespace UserService.Data 
{
    public class UserRepo : IUserRepo 
    {
        private readonly AppDbContext _context;
        public UserRepo(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<User>> GetAllUsers() 
        {
            return await _context.user.Find(_ => true).ToListAsync();
        }

        public Task<User> GetUserById(string id) 
        {
            return _context.user.Find(c => c.Id == id).SingleOrDefaultAsync();
        }

        public Task<User> GetUserByEmail(string email)
        {
            return _context.user.Find(c => c.Email == email).SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<User>> GetUsersBySpecialization(string specialization)
        {
            var usersSkilled = new List<User>();
            var users = await _context.user.Find(_ => true).ToListAsync();
            foreach(var user in users)
            {
                foreach(var skill in user.skills)
                {
                    if(skill.Specializationname == specialization)
                    {
                        usersSkilled.Add(user);
                    }
                }
            }
            return usersSkilled;
        }

        public async Task<IEnumerable<User>> GetUsersBySpecializationAndByExperience(string specialization, string experience)
        {
            var usersSkilled = new List<User>();
            var users = await _context.user.Find(_ => true).ToListAsync();
            foreach(var user in users)
            {
                foreach(var skill in user.skills)
                {
                    if(skill.Specializationname == specialization && skill.Experiencename == experience)
                    {
                        usersSkilled.Add(user);
                    }
                }
            }
            return usersSkilled;
        }

        public async Task<IEnumerable<User>> GetUsersBySkillId(string id)
        {
            var usersSkilled = new List<User>();
            var users = await _context.user.Find(_ => true).ToListAsync();
            foreach(var user in users)
            {
                for(var i=0; i<user.Skillsid.Length; i++)
                {
                    if(user.Skillsid[i] == id)
                    {
                        usersSkilled.Add(user);
                    }
                }
            }
            return usersSkilled;
        }

        public async Task CreateUser(User User)
        {
            if(User != null)
            {
                await _context.user.InsertOneAsync(User); 
            }
        }

        public async Task<User> UpdateUserById(string id, User user)
        {
            return await _context.user.FindOneAndReplaceAsync(c => c.Id == id,
                new User { Id = id, Role = user.Role, Firstname = user.Firstname, Lastname = user.Lastname, Address = user.Address, Postalcode = user.Postalcode, Town = user.Town, Phone = user.Phone, Email = user.Email, Skillsid = user.Skillsid, skills = user.skills, Password = user.Password, Photo = user.Photo });
        }

        public async Task DeleteUserById(string id)
        {
            await _context.user.DeleteOneAsync(c => c.Id == id);
        }

    }
}