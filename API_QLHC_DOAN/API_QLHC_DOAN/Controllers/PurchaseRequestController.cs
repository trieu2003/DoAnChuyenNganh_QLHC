using API_QLHC_DOAN.Data;
using API_QLHC_DOAN.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_QLHC_DOAN.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PurchaseRequestController : ControllerBase
    {
        private readonly YourDbContext _context;
        public PurchaseRequestController(YourDbContext context)
        {
            _context = context;
        }
        //Phiếu đề xuất
        [HttpGet("GetPhieuDeXuat")]
        public async Task<ActionResult<IEnumerable<PhieuDeXuat>>> GetPurchaseRequest()
        {
            var purchaserequest = await _context.PhieuDeXuat.ToListAsync();
            return Ok(purchaserequest);
        }
        //Chi tiết phiếu đề xuất
        [HttpGet("GetChiTietPhieuDeXuat")]
        public async Task<ActionResult<IEnumerable<ChiTietDeXuat>>> GetPurchaseRequestDetail()
        {
            var detailpurchaserequest = await _context.ChiTietDeXuat.ToListAsync();
            return Ok(detailpurchaserequest);
        }
    }
}
