using System;
using System.Collections;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Scrypt;

public static class Password
{
    public static string ToHash(string password)
    {
        ScryptEncoder encoder = new ScryptEncoder(16384, 8, 1);
        return encoder.Encode(password);
    }

    public static bool Compare(string storedPassword, string suppliedPassword)
    {
        ScryptEncoder encoder = new ScryptEncoder(16384, 8, 1);
        return encoder.Compare(suppliedPassword, storedPassword);
    }
}
