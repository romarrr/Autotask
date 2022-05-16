using System.Collections.Generic;
using ClientService.Models;

namespace ClientService.Data 
{
    public interface IClientRepo 
    {
        Task<IEnumerable<Client>> GetAllClients();
        Task<Client> GetClientById(string id);
        Task CreateClient(Client client);
        Task<Client> UpdateClientById(string id, Client client);
        Task DeleteClientById(string id);
    }
}