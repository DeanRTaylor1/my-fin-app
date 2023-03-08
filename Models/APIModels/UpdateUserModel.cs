using System;
using System.Collections.Generic;

namespace my_fin_app.Models;

public class UpdateUserModel
{
    public string? email { get; set; }

    public int? monthlySalary { get; set; }

    public string? username { get; set; } = null!;

    public string? currency { get; set; }

    public string? phone { get; set; }

    public int? savingsTarget { get; set; }

    public int? savingsRate { get; set; }

    public int? currentSavings { get; set; }
}

public class FinancesRequestModel
{
    public string? email { get; set; } = null!;

    public int? page { get; set; }
}
