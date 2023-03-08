using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace my_fin_app.Models;

public partial class FixedOutgoingsMonthly
{
    [JsonIgnore]
    public int Id { get; set; }

    public DateTime? CreatedAt { get; set; }

    [JsonIgnore]
    public DateTime? UpdatedAt { get; set; }

    public string Item { get; set; } = null!;

    public string Currency { get; set; } = null!;

    public int UserId { get; set; }

    public string? Tag { get; set; }

    public int Cost { get; set; }

    [JsonIgnore]
    public virtual User User { get; set; } = null!;
}
