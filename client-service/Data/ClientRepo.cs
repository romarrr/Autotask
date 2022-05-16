using ClientService.Models;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;

namespace ClientService.Data 
{
    public class ClientRepo : IClientRepo 
    {
        private readonly AppDbContext _context;
        public ClientRepo(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Client>> GetAllClients() 
        {
            return await _context.client.Find(_ => true).ToListAsync();
        }

        public Task<Client> GetClientById(string id) 
        {
            return _context.client.Find(c => c.Id == id).SingleOrDefaultAsync();
        }

        public async Task CreateClient(Client client)
        {
            if(client != null)
            {
                await _context.client.InsertOneAsync(client); 
            }
        }

        public async Task<Client> UpdateClientById(string id, Client client)
        {
            return await _context.client.FindOneAndReplaceAsync(c => c.Id == id,
                new Client { Id = id, Firstname = client.Firstname, Lastname = client.Lastname, Address = client.Address, Postalcode = client.Postalcode, Town = client.Town, Phone = client.Phone, Email = client.Email, Company = client.Company, Logo = client.Logo });
        }

        public async Task DeleteClientById(string id)
        {
            await _context.client.DeleteOneAsync(c => c.Id == id);
        }
    }
}