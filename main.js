let currentDragTarget;
let targetList = $("#targetContainerA")
let spanId = 0;

let doubleClickHandler = (target) => {
    var originalText = $("#"+target).text();
    $("#"+target).replaceWith('<input id="'+target+'" class="text-gray-700 font-medium" type="text" value="' + originalText + spanId.toString() + "input" + '" autofocus>');
    $("#"+target).focus()
    $("#"+target).blur(function () {
        var newText = $("#"+target).val();
        $(this).replaceWith('<span id="'+target+'" class="ml-2 flex-1 truncate bg-black">' + newText + spanId.toString() + '</span>');
        $("#"+target).dblclick(function () {doubleClickHandler(target)});
    });
};

let deleteTask = (target) => {
    console.log(target);
    $(target).parent().remove();
}

let checkTask = (target) => {
    console.log(target);
    if($(target).hasClass('line-through'))
    {
        $(target).removeClass("line-through");
    }
    else
    {
        $(target).addClass("line-through");
        console.log("class added");
    }
}



let addTask = () => {
    let instanceId = spanId;
    targetList.append('<li class="flex items-center mt-2 text-white text-xl">\
    <span id="span'+instanceId+'" class="ml-2 flex-1 truncate bg-black">Todo item 4</span>\
    <button id="check'+instanceId+'" class="rounded bg-blue-500 hover:bg-blue-700 py-2 px-4 text-white">CHECK</button>\
    <button id="delete'+instanceId+'" class="rounded bg-blue-500 hover:bg-blue-700 py-2 px-4 text-white">DELETE</button>\
    </li>')
    let target = "span"+instanceId;
    $("#check"+instanceId).on("click", function () {checkTask("#"+target)});
    $("#delete"+instanceId).on("click", function () {deleteTask("#delete"+instanceId)});
    $("#"+target).dblclick(function () {doubleClickHandler(target)});
    // $("#"+target).mousedown(function (e) 
    // {
    //     beginDrag(e);
    //     currentDragTarget = target
    // })
    $("#"+target).draggable({
        axis: "x",
        containment: $("#"+target).parent(),
        revert: true
    })

    spanId++;
    console.log(target)
}

// let soluce = false;
// let beginDrag = (e)=> 
// {
//         soluce = true;
//         $('#'+currentDragTarget).mousemove(function (e) {dragTarget (e)});
// }

// let dragTarget = (target) =>
// {
//     let originLeft =  $('#'+currentDragTarget).css("left")
//     // let originTop = $('#'+currentDragTarget).style.top
//     if(soluce === true)
//     {
//         let newleft;
//         newleft = target.clientX - ($('#'+currentDragTarget).offsetWidth /50) + 'px';
//         $('#'+currentDragTarget).css("left", newleft)
//         // $('#'+currentDragTarget).style.top = target.clientY - ($('#'+currentDragTarget).offsetHeight /50) + 'px';
//     }
//     else
//     {
//         $('#'+target).style.left = originLeft;
//         // $('#'+target).style.top = originTop;
//     }

//     if(collideCallBack($('#'+currentDragTarget), $('#'+currentDragTarget).parent) == "left")
//     {
//         checkTask('#'+target)
//         soluce = false;
//     }
//     else if(collideCallBack($('#'+currentDragTarget), $('#'+currentDragTarget).parent) == "right")
//     {
//         deleteTask('#'+target)
//         soluce = false;
//     }
// }

// let collideCallBack = function(a,b){
//     if ((a.x + a.width/2) < b.x)
//     {
//         return "left"
//     } 
//     if (a.x > (b.x + b.width))
//     {
//         return "right"
//     }
// }

// let endDrag = () =>
// {
//     soluce = false;
//     $('#'+currentDragTarget).off('mousemove');
//     currentDragTarget = null;
// }

$("#addButton").on("click", addTask)