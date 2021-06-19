$(function() {
    loadrecipes();
    $("#recipes").on("click",".del",del);
    $("#recipes").on("click",".edit",handleupdate);
    $("#addbtn").click(addrecipe);
    $("#updatesave").click(function() {
        var id = $("#updateid").val();
        var title = $("#updatetitle").val();
        var body = $("#updatebody").val();
        $.ajax({
            url:"https://usman-recipes.herokuapp.com/api/recipes/"+id,
            data:{title,body},
            method:"PUT",
            success:function(response){
                console.log(response);
                loadrecipes();
            }
        });
    });
});

function handleupdate() {

    var btn = $(this);
    var parent = btn.closest(".recipes");
    let lid = parent.attr("id");

    $.get("https://usman-recipes.herokuapp.com/api/recipes/" + id,function(response){
        $("#updateid").val(response._id);
        $("updatetitle").val(response.title);
        $("#updatebody").val(response.body);
        $("#updatemodal").modal("show");

    });
}

function addrecipe(title,body) {
    title = $("#title").val();
    body = $("#body").val();
    $.ajax({
        url:"https://usman-recipes.herokuapp.com/api/recipes",
        method:"POST",
        data: {title,body},
        success:function(response){
            console.log(response);
            loadrecipes();
        }
    });
}
function del(){
    var btn = $(this);
    var parent = btn.closest(".recipes");
    let lid = parent.attr("id");
    $.ajax({
        url:"https://usman-recipes.herokuapp.com/api/recipes/",
        method:"DELETE",
        success: function() {
            loadrecipes();
            $("#updatemodal").modal("hide");
        }
    });
}

function loadrecipes() {
    $.ajax({
        url:"https://usman-recipes.herokuapp.com/api/recipes/",
        method:"GET",
        success:function(response){
            console.log(response);
            var recipes = $("#recipes");
            recipes.empty();
            for(var i=0;i<response.length;i++)
            {
                var tit = response[i];
                //recipes.append("<div><h3>" + tit.title + "<button>edit</button><button>delete</button></h3>" + tit.body + "</div>");
                //easy to write as follows
                recipes.append(`<div id="${tit._id}"><h3>${tit.title} <button class="edit">edit</button><button class="del">delete</button> </h3> ${tit._id} ${tit.body}</div>`);
            }
        }
    });
}