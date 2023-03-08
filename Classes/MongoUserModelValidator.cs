using FluentValidation;
using my_fin_app.Models;

public class MongoUserModelValidator : AbstractValidator<UserModel>
{
    public MongoUserModelValidator()
    {
        RuleFor(x => x.email).NotEmpty().EmailAddress();
        RuleFor(x => x.password)
            .NotEmpty()
            .Matches(@"(?=.*[A-Z])")
            .Matches(@"(?=.*[0-9])")
            .Matches(@"(?=.*[a-zA-Z])");
        RuleFor(x => x.username).NotEmpty();
    }
}
