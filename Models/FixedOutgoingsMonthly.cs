using System;
using System.Collections.Generic;

namespace my_fin_app.Models;

public partial class FixedOutgoingsMonthly
{
    public int Id { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public string Item { get; set; } = null!;

    public string Currency { get; set; } = null!;

    public int UserId { get; set; }

    public string? Tag { get; set; }

    public int Cost { get; set; }

    public virtual User User { get; set; } = null!;
}
