import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY='AIzaSyDf831o_sL2rwD5HxFvAbpeAS3G47vbTrU';



// Create a new Component. This Component produce some HTML.

class App extends Component{
    constructor(props){
        super(props);
        
        this.state={
            videos:[],
            selectedVideo:null
        };
        this.videoSearch('punjabi')
    }

    videoSearch(term){
        YTSearch({key:API_KEY, term: term},(videos)=>{
            this.setState({
                videos,
                selectedVideo:videos[0]
            });
        })
    }

    render(){
        const videoSearch = _.debounce((term)=>this.videoSearch(term),300);
        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch}/>
                <VideoDetail video={this.state.selectedVideo}/> 
                <VideoList 
                    onVideoSelect={selectedVideo=>this.setState({selectedVideo})}
                    videos={this.state.videos}
                />
            </div>
        );
    }
    
}

//take this components generated HTML and put it on the page.

ReactDOM.render(<App />, document.querySelector('.container'));