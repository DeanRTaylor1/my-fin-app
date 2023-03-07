using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace my_fin_app.Models;

public partial class DeanrtaylorfinanceContext : DbContext
{
    public DeanrtaylorfinanceContext()
    {
    }

    public DeanrtaylorfinanceContext(DbContextOptions<DeanrtaylorfinanceContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Expense> Expenses { get; set; }

    public virtual DbSet<FixedOutgoingsMonthly> FixedOutgoingsMonthlies { get; set; }

    public virtual DbSet<User> Users { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Expense>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("transactions_pkey");

            entity.ToTable("expenses");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("nextval('transactions_id_seq'::regclass)")
                .HasColumnName("id");
            entity.Property(e => e.Cost).HasColumnName("cost");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("created_at");
            entity.Property(e => e.Currency)
                .HasMaxLength(40)
                .HasColumnName("currency");
            entity.Property(e => e.DateSpent).HasColumnName("date_spent");
            entity.Property(e => e.Item)
                .HasMaxLength(240)
                .HasColumnName("item");
            entity.Property(e => e.Tag)
                .HasMaxLength(40)
                .HasColumnName("tag");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("updated_at");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.User).WithMany(p => p.Expenses)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("transactions_user_id_fkey");
        });

        modelBuilder.Entity<FixedOutgoingsMonthly>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("fixed_outgoings_monthly_pkey");

            entity.ToTable("fixed_outgoings_monthly");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Cost).HasColumnName("cost");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("created_at");
            entity.Property(e => e.Currency)
                .HasMaxLength(40)
                .HasColumnName("currency");
            entity.Property(e => e.Item)
                .HasMaxLength(240)
                .HasColumnName("item");
            entity.Property(e => e.Tag)
                .HasMaxLength(40)
                .HasColumnName("tag");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("updated_at");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.User).WithMany(p => p.FixedOutgoingsMonthlies)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("fixed_outgoings_monthly_userid_fkey");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("users_pkey");

            entity.ToTable("users");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AuthId)
                .HasMaxLength(240)
                .HasColumnName("auth_id");
            entity.Property(e => e.AuthStrategy)
                .HasMaxLength(240)
                .HasColumnName("auth_strategy");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("created_at");
            entity.Property(e => e.Currency)
                .HasMaxLength(40)
                .HasDefaultValueSql("'vnd'::character varying")
                .HasColumnName("currency");
            entity.Property(e => e.CurrentSavings)
                .HasDefaultValueSql("0")
                .HasColumnName("current_savings");
            entity.Property(e => e.Email)
                .HasMaxLength(40)
                .HasColumnName("email");
            entity.Property(e => e.MonthlySalary).HasColumnName("monthly_salary");
            entity.Property(e => e.Phone)
                .HasMaxLength(40)
                .HasColumnName("phone");
            entity.Property(e => e.SavingsRate)
                .HasDefaultValueSql("50")
                .HasColumnName("savings_rate");
            entity.Property(e => e.SavingsTarget)
                .HasDefaultValueSql("0")
                .HasColumnName("savings_target");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("updated_at");
            entity.Property(e => e.Username)
                .HasMaxLength(240)
                .HasColumnName("username");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
