
$('#watchListCount').text(JSON.parse(localStorage.getItem('watchList')).length);
function getPage(page) {
    fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
        .then(res => {
            return res.json();
        })
        .then(data => {

            $('.characterContainer').empty();
            for (let el of data.results) {
                $('.characterContainer').append(`<div class="charactersCard">
            <h3>${el.name}</h3>
            <img src='${el.image}'>
            <button class="view" id="${el.id}">View</button>
            </div>`);
            }
            console.log();
            $('.view').click(function (e) {
                let CharacterID = e.target.id
                console.log(e);
                getCharacterbyID(CharacterID)
                $('.productPopup').css('display', 'flex');
                $('.wrap').css('filter', 'blur(10px)');
            })

        })
}

getPage(1);


function getCharacterbyID(id) {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            $('.images').css(`background-image`, `url(${data.image})`);
            $('.status').text(`Status: ${data.status}`);
            $('#gendervalue').text(`${data.gender}`);
            $('#namevalue').text(` ${data.origin.name}`);
            $('#locnamevalue').text(` ${data.location.name}`);
            $('#created').text(` ${data.created}`);
            $('.name').text(` ${data.name}`);

            console.log(data);
        })

}
let watchList = JSON.parse(localStorage.getItem('watchList')) || [];
function getEpisode(page) {
    fetch(`https://rickandmortyapi.com/api/episode?page=${page}`)
        .then(res => {
            return res.json();
        })
        .then(data => {

            $('.wrapper').empty();
            for (let el of data.results) {
                $('.wrapper').append(`<div class="one">
                <h3>${el.name}</h3>
                <p>${el.air_date}</p>
                <button class='saveWatch' id="${el.id}">Add<button>
            </div>`);
            }

            $('.saveWatch').click(function (e) {

                getEpisodeByID(e.target.id);
            })

        })


}
getEpisode(1);



function getEpisodeByID(id) {
    fetch(`https://rickandmortyapi.com/api/episode/${id}`)
        .then(res => {
            return res.json();
        })
        .then(data => {

            watchList.push(data);

            localStorage.setItem('watchList', JSON.stringify(watchList));

            $('#watchListCount').text(JSON.parse(localStorage.getItem('watchList')).length);

        })
}






$('.exit').click(function () {
    $('.productPopup').css('display', 'none');
    $('.wrap').css('filter', 'blur(0)');
});

$('.char').click(function () {
    $('.character').css('display', 'flex');
    $('.episodes').css('display', 'none');
});
$('.epis').click(function () {
    $('.character').css('display', 'none');
    $('.episodes').css('display', 'flex');
});





let currentPage = 1;
const totalPages = 42;

getPage(currentPage);
$('.pageNumber').text(currentPage);

$('#nextBtn').click(function () {
    currentPage++;
    if (currentPage > totalPages) {
        currentPage = 1;
    }
    getPage(currentPage);
    $('.pageNumber').text(currentPage);
});

$('#prevBtn').click(function () {
    currentPage--;
    if (currentPage < 1) {
        currentPage = totalPages;
    }
    getPage(currentPage);
    $('.pageNumber').text(currentPage);
});

let currentPageEpisode = 1;
const totalPagesEpisode = 42;

getEpisode(currentPageEpisode);
$('.pageNumber').text(currentPageEpisode);

$('#nextBtn').click(function () {
    currentPageEpisode++;
    if (currentPageEpisode > totalPagesEpisode) {
        currentPageEpisode = 1;
    }
    getEpisode(currentPageEpisode);
    $('.pageNumber').text(currentPageEpisode);
});

$('#prevBtn').click(function () {
    currentPageEpisode--;
    if (currentPageEpisode < 1) {
        currentPageEpisode = totalPagesEpisode;
    }
    getEpisode(currentPageEpisode);
    $('.pageNumber').text(currentPageEpisode);
});
