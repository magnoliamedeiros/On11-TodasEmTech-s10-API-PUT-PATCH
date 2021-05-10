const express = require("express");
const { post } = require("../app");
const postsJson = require("../models/posts.json");

const getAll = (request, response)=>{
    response.status(200).send(postsJson);
}

const getById = (request, response)=>{
    const idRequerido = request.params.id;
    const postFiltrado = postsJson.find(post => post.id == idRequerido);

    response.status(200).send(postFiltrado);
}

const createPost = (request, response) => {
    let tituloRequerido = request.body.titulo;
    let conteudoRequerido = request.body.conteudo;
    let etiquetasRequeridas = request.body.etiquetas;

    let newPost = {
        id: Math.random().toString(32).substr(2, 6),
        dataCriacao: new Date(),
        titulo: tituloRequerido,
        conteudo: conteudoRequerido,
        etiquetas: etiquetasRequeridas
    }

    postsJson.push(newPost);

    response.status(201).json([{
        "mensagem": "Post criado com sucesso",
        newPost
    }])
}

// PUT
const replacePost = (request, response)=>{
    const idRequerido = request.params.id;
    let postBody = request.body
    const postFiltrado = postsJson.find(post => post.id == idRequerido);
    
    let postAtualizado = {
        id: postFiltrado.id,
        dataCriacao: postFiltrado.dataCriacao,
        titulo: postBody.titulo,
        conteudo: postBody.conteudo,
        etiquetas: postBody.etiquetas
    }

    const indice = postsJson.indexOf(postFiltrado);
    postsJson.splice(indice, 1, postAtualizado);

    response.status(200).json([{
        "mensagem": "Post atualizado com sucesso",
        postAtualizado
    }])
}

// PATCH
const updateTitle = (request, response)=>{
    const idRequerido = request.params.id;
    let newTitle = request.body.titulo;
    const postFiltrado = postsJson.find(post => post.id == idRequerido);

    postFiltrado.titulo = newTitle;

    response.status(200).json([{
        "mensagem": "Título atualizado com sucesso",
        postFiltrado
    }])
}

const deletePost = (request, response)=>{
    const idRequerido = request.params.id;
    const postFiltrado = postsJson.find(post => post.id === idRequerido);
    
    const indice = postsJson.indexOf(postFiltrado);
    postsJson.splice(indice, 1);

    response.status(200).json([{
        "mensagem": "Post deletado com sucesso",
        postsJson
    }])
}

module.exports = {
    getAll,
    getById,
    createPost,
    replacePost,
    updateTitle,
    deletePost
}