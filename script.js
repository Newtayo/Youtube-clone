const videoContainerCard = document.querySelector('.videoCard')

let api_key = "AIzaSyA-hYAB4jp4vlEDsQKEWlYAYb-Ytm6-zms";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http ="https://www.googleapis.com/youtube/v3/channels?";

fetch(video_http + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 8,
    regionCode: 'NG'
}))
.then(res => res.json())
.then(data => {
    console.log(data);

    data.items.forEach(item => {
        getChannelIcon(item);
    })       
    }).catch(err => console.log(err));

    const getChannelIcon =  (video_data) => {
        fetch (channel_http + new URLSearchParams({
            key : api_key,
            part: 'snippet',
            id: video_data.snippet.channelId
        } ))
        .then (res => res.json())
        .then(data =>{
            
            video_data.channelThumbnail =data.items[0].snippet.thumbnails.default.url;
            console.log(video_data);
            makeVideoCard(video_data);

        })

    }

    const makeVideoCard = (data) =>{
        videoContainerCard.innerHTML += `
        <div class = "video" onclick = "location.href ='https://youtube.com/watch?v=${data.id}'"> 
            <img src = "${data.snippet.thumbnails.high.url}" class = "thumbnail" alt =""></img>
        <div class ="content">
           
                <div class = "info">
                    <h4 class = "title " onclick = "location.href ='https://youtube.com/watch?v=${data.id}'">${data.snippet.title} </h4> 
                    <p class = "channel-name">${data.snippet.channelTitle}</p>   
                    <p class = "channel-date">${data.snippet.publishedAt}</p> 
                </div>
                
        </div>
        </div>
        
        `
        


        

    }



