$(document).ready(function () {
    $("#searchTxt").keyup(function (e) {
        var ele = $(".name");
        var img = Array.from($(".image"));
        var query = $(this).val();
        Array.from(ele).forEach(function (element, index) {
            var z = element.innerText;
            if (z.includes(query)) {
                element.style.display = "table-row";
            } else {
                element.style.display = "none";
            }
        });
    });
    $.get("./data.json",
        function (data, textStatus, jqXHR) {
            var names = data["names"];
            var links = data["links"]
            for (let index = 0; index < names.length; index++) {
                const pok = names[index];
                const images = links[index];
                $("tbody").append(`
                    <tr class="name">
                        <td><h3>${pok}</h3></td>
                        <td><img src="${images}" height="100" width="100" data-toggle="modal" data-target=".bd-example-modal-xl${pok}" style="cursor:pointer;">
                        <div class="modal fade bd-example-modal-xl${pok}" tabindex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-xl">
                            <div class="modal-content">
                            <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">${pok}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                            </div>
                            <div class="modal-body">
                            <center><img src="${images}" height="300" width="40%"></center> 
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        </td>
                    </tr>`);
            }
        }
    );
});