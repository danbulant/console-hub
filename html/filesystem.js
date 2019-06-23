//Frontend renderer process javascript file for filesystem
function refreshFiles(){
  if(files == null){
    return;
  }
  var shown = [];
  $("#files-list").empty();
  var up = document.createElement('li');
  $("#files-list").append(up);
  up.id = "file-up";
  $("#file-up").html(' . .');
  files.forEach((item, index) => {
    shown[index] = document.createElement('li');
    $("#files-list").append(shown[index]);
    shown[index].id = "file-" + index;
    var name = item.substring(item.lastIndexOf('\\') + 1, item.length);
    $("#file-" + index).html(name);
  });
}
