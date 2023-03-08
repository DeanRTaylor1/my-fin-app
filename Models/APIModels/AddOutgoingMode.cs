namespace my_fin_app.Models;

public class AddOutgoingModel
{
    public string? email { get; set; }

    public string? item { get; set; }

    public string? tag { get; set; } = null!;

    public string? currency { get; set; }

    public int? cost { get; set; }
}
