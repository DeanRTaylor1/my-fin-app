using System;
using System.Collections.Generic;

namespace my_fin_app.Models;

public partial class User
{
    public int Id { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public string? Email { get; set; }

    public int MonthlySalary { get; set; }

    public string Username { get; set; } = null!;

    public string? Currency { get; set; }

    public string? Phone { get; set; }

    public int? SavingsTarget { get; set; }

    public string? AuthStrategy { get; set; }

    public string? AuthId { get; set; }

    public int? SavingsRate { get; set; }

    public int? CurrentSavings { get; set; }

    public virtual ICollection<Expense> Expenses { get; } = new List<Expense>();

    public virtual ICollection<FixedOutgoingsMonthly> FixedOutgoingsMonthlies { get; } =
        new List<FixedOutgoingsMonthly>();
}

public class UserDto
{
    public string? Email { get; set; }

    public int MonthlySalary { get; set; }

    public string Username { get; set; } = null!;

    public string? Currency { get; set; }

    public string? Phone { get; set; }

    public int? SavingsTarget { get; set; }

    public int? SavingsRate { get; set; }

    public int? CurrentSavings { get; set; }
}
