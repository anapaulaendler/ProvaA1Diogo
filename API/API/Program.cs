using API.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();

builder.Services.AddCors(options =>
options.AddPolicy("Acesso Total",
    configs => configs
    .AllowAnyOrigin()
    .AllowAnyHeader()
    .AllowAnyMethod()
    )
);

var app = builder.Build();

app.MapGet("/", () => "Prova A1");

//ENDPOINTS DE CATEGORIA
//GET: http://localhost:5273/api/categoria/listar
app.MapGet("/api/categoria/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Categorias.Any())
    {
        return Results.Ok(ctx.Categorias.ToList());
    }
    return Results.NotFound("Nenhuma categoria encontrada");
});

//POST: http://localhost:5273/api/categoria/cadastrar
app.MapPost("/api/categoria/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Categoria categoria) =>
{
    ctx.Categorias.Add(categoria);
    ctx.SaveChanges();
    return Results.Created("", categoria);
});

//ENDPOINTS DE TAREFA
//GET: http://localhost:5273/api/tarefas/listar
app.MapGet("/api/tarefas/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Tarefas.Any())
    {
        return Results.Ok(ctx.Tarefas.Include(x => x.Categoria).ToList());
    }
    return Results.NotFound("Nenhuma tarefa encontrada");
});

//GET: BUSCAR
app.MapGet("/api/tarefas/buscar/{id}", ([FromRoute] string id, [FromServices] AppDataContext ctx) =>
{
    Tarefa? tarefa = ctx.Tarefas.Find(id);

    if (tarefa is null)
    {
        return Results.NotFound("Tarefa não encontrada");
    }

    return Results.Ok(tarefa);
});

//POST: http://localhost:5273/api/tarefas/cadastrar
app.MapPost("/api/tarefas/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Tarefa tarefa) =>
{
    Categoria? categoria = ctx.Categorias.Find(tarefa.CategoriaId);
    if (categoria == null)
    {
        return Results.NotFound("Categoria não encontrada");
    }
    tarefa.Categoria = categoria;
    ctx.Tarefas.Add(tarefa);
    ctx.SaveChanges();
    return Results.Created("", tarefa);
});

//PUT: http://localhost:5273/tarefas/alterar/{id}
app.MapPut("/api/tarefas/alterar/{id}", ([FromServices] AppDataContext ctx, [FromRoute] string id) =>
{
    Tarefa? tarefa = ctx.Tarefas.Find(id);

    if (tarefa is null)
    {
        return Results.NotFound("Tarefa não encontrada");
    }

    if (tarefa.Status == "Concluída")
    {
        return Results.BadRequest("Tarefa já concluída");
    }
    
    else if (tarefa.Status == "Em andamento")
    {
        tarefa.Status = "Concluída";
    }

    if (tarefa.Status == "Não iniciada")
    {
        tarefa.Status = "Em andamento";
    }

    ctx.Tarefas.Update(tarefa);
    ctx.SaveChanges();

    return Results.Ok($"Tarefa atualizada. Status atual da tarefa: {tarefa.Status}");
});

//GET: http://localhost:5273/tarefas/naoconcluidas
app.MapGet("/api/tarefas/naoconcluidas", ([FromServices] AppDataContext ctx) =>
{
    // return Results.Ok(ctx.Tarefas.Include(x => x.Categoria).ToList());
    List<Tarefa> t = ctx.Tarefas.Include(x => x.Categoria).Where(t => t.Status == "Não iniciada").ToList();
    t.AddRange(ctx.Tarefas.Include(x => x.Categoria).Where(t => t.Status == "Em andamento").ToList());
    
    // if (t is null)
    // {
    //     return Results.NotFound("Sem tarefas não iniciadas.");
    // }

    return t;
});

//GET: http://localhost:5273/tarefas/concluidas
app.MapGet("/api/tarefas/concluidas", ([FromServices] AppDataContext ctx) =>
{
    List<Tarefa> t = ctx.Tarefas.Include(x => x.Categoria).Where(t => t.Status == "Concluída").ToList();
    
    // if (t is null)
    // {
    //     return Results.NotFound("Sem tarefas não iniciadas.");
    // }

    return t;
});

app.UseCors("Acesso Total");
app.Run();