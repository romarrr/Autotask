using UserService.Models;

namespace UserService.Data 
{
    public interface IUserRepo 
    {
        Task<IEnumerable<User>> GetAllUsers();
        Task<User> GetUserById(string id);
        Task<User> GetUserByEmail(string email);
        Task<IEnumerable<User>> GetUsersBySpecialization(string specialization);
        Task<IEnumerable<User>> GetUsersBySpecializationAndByExperience(string specialization, string experience);
        Task<IEnumerable<User>> GetUsersBySkillId(string id);
        Task CreateUser(User user);
        Task<User> UpdateUserById(string id, User user);
        Task DeleteUserById(string id);
    }
}