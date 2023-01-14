import { useState, useEffect } from 'react';
import { Table, TableHead, TableCell, Paper, TableRow, TableBody, Button, styled, Grid} from '@mui/material'
import { getEligiblePlayers, deletePlayer } from '../Service/api';
import { Link } from 'react-router-dom';
import { Container } from '@mui/system';

const StyledTable = styled(Table)`
    width: 90%;
    margin: 50px 0 0 50px;
`;

const THead = styled(TableRow)`
    & > th {
        font-size: 20px;
        background: #000000;
        color: #FFFFFF;
    }
`;

const TRow = styled(TableRow)`
    & > td{
        font-size: 18px
    }
`;

const initialValue = {
    name: '',
    dept: '',
    year: '',
    speciality: '',
    wk: '',
    registered: 'No',
    soldto: 'Unsold'
}

const AllEligiblePlayers = () => {

    let playerName = "Player Name";
    const [idx, setIdx] = useState(0);
    const [players, setPlayers] = useState(initialValue);
    
    useEffect(() => {
        getAllPlayers();
    }, [players]);

    const getAllPlayers = async () => {
        try {
            let response = await getEligiblePlayers();
            setPlayers(response.data);
        } catch (error) {
            console.log("getAllPlayers error: ", error);
        }
        
    }

    const clickedStartBtn = ()=>{

        const playersCount = players.length;
        
        if(playersCount == 0){
          alert("No more players");
        }
        else if(window.confirm('Do you want to start the bidding?')){
          const name = document.querySelectorAll('#player-name1')[0];
          const name2=document.getElementById("player-name2");
          const year = document.querySelectorAll('#year')[0];
          const dept = document.querySelectorAll('#dept')[0];
          const speciality = document.querySelectorAll('#speciality')[0];
          const wk = document.querySelectorAll('#wk')[0];
          name.innerHTML = `${players[0].name}`;
          name2.innerHTML = `${players[0].name}`;
          year.innerHTML = `${players[0].year}`;
          dept.innerHTML = `${players[0].dept}`;
          speciality.innerHTML = `${players[0].speciality}`;
          wk.innerHTML = `${players[0].wk}`;
        }
    }




        const bidValue=document.getElementById("bid-value");
        const bidderName=document.getElementById("bidder-name");
        const bidButton=document.getElementById("bid-button");
        const newBidValue=document.getElementById("new-bid-value");
        const newBidderName=document.getElementById("new-bidder-name");
        const teamNames=["RR","CSK","KKR","DC","RCB","SRH"];

        // on update button click
        let bidderIndex=0;
        const bidButtonClick= ()=>{

          try {
            const val=newBidValue.value;
            const currIdx=parseInt(newBidderName.value);
            const bidder=teamNames[currIdx];
            //const bidder=newBidderName.value;
            //const currPoint=parseInt(teamPointArr[currIdx])+parseInt(val);
            if(val==''){
              alert('Bid Value Field Empty!')
            }
            else if(bidder=='select'){
              alert('Select the Bidder!')
            }
            // else if(parseInt(val) < parseint(bidvalue.innertext)){ 
            //   alert("current bid value less than previous bid!"); 
            // } 
            // else if(currpoint> maxPoint){
            //   console.log(teamPointArr[currIdx],val,currIdx);
            //   alert("Not enough point!")
            // }
            else{
              bidderIndex=parseInt(newBidderName.value);
              //console.log(bidderIndex);
              bidValue.innerHTML=val;
              bidderName.innerHTML=bidder;
              newBidValue.value="";
              newBidderName.value="select";
            }
          } catch (error) {
            
            alert('Player Data not fetched yet');
            console.log('Error on update button click: ',error);

          }
      } // end of update button functionality

      const resetBtnClick = ()=>{
        if(window.confirm("Are you sure you want to reset?")){
          bidValue.innerHTML="0000";
          bidderName.innerHTML="Unsold";
          newBidValue.value="";
          newBidderName.value="select";
        }
      }



    return (

        <div>

            {/*Navbar */}
      <nav className="mb-1 navbar navbar-expand-lg navbar-dark default-color" id="nav">
        <a className="navbar-brand" href="#">MCL</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-333" aria-controls="navbarSupportedContent-333" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent-333">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#" id="start" onClick={() => clickedStartBtn()}>Start Bidding
                {/* <span class="sr-only">(current)</span>  */}
              </a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink-333" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Sheets
              </a>
              <div className="dropdown-menu dropdown-default" aria-labelledby="navbarDropdownMenuLink-333">
                <a className="dropdown-item" href="https://docs.google.com/spreadsheets/d/1YbGjVNyBVm14jz-FsrWaziq7EuRvUoX8a8PFuGkaLJo/edit#gid=0" target="_blank">Input Sheet</a>
                <a className="dropdown-item" href="https://docs.google.com/spreadsheets/d/1Gr6PnoMYJn0dQHQ0nPuLSg5xIsXL0qxgZx7sNKPDOIU/edit?usp=sharing" target="_blank">Output Sheet</a>
                <a className="dropdown-item" href="https://docs.google.com/spreadsheets/d/1im8fhoFTRF4te0m2jAiOxzYLfzLRhnDgbBwoFLERD9U/edit#gid=0" target="_blank">Points Sheet</a>
              </div>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto nav-flex-icons">
            <li className="nav-item">
              <a className="nav-link waves-effect waves-light">
                <i className="fab fa-twitter" />
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link waves-effect waves-light">
                <i className="fab fa-google-plus-g" />
              </a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink-333" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fas fa-user" />
              </a>
              <div className="dropdown-menu dropdown-menu-right dropdown-default" aria-labelledby="navbarDropdownMenuLink-333">
                <a className="dropdown-item" href="https://www.instagram.com/white_pegasus_/?hl=en">Creator</a>
                <a className="dropdown-item" href="https://www.instagram.com/mcl_msit/">Contact Us</a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      {/*/.Navbar */}


            <div className="w3-content w3-margin-top" style={{maxWidth: '1400px'}}>
        <div className="w3-row-padding" id="parent-div" style={{marginTop: '60px'}}>
          <div id="sold-div" style={{display: 'none', padding: '100px'}}>
            <h2 id="sold-detail"><span id="sold-player-name">Player Name</span> sold to <span id="sold-player-team">teamname</span> by <span id="sold player bid">bid</span> points</h2> 
            <button id="goto-next-bid">Go to Next Bid</button>
          </div>
          {/* Left Column */}
          <div className="w3-third" id="left-column">
            <div className="w3-white w3-text-grey w3-card-4">
              <div className="w3-display-container">
                <img className="center-cropped" src="default-image.png" onerror="this.src='default-image.png'" style={{width: '100%', height: '400px'}} alt="Avatar" id="player-image" onerror="this.src=image-not-found.jpg" />
                <div className="w3-display-bottomleft w3-container w3-text-black">
                  {/* <h2 style={{color: 'aliceblue'}} id="player-name1">Player Name</h2> */}
                  <h2 style={{color: 'aliceblue'}} id="player-name1">{playerName}</h2>
                </div>
              </div>
              <div className="w3-container mt-3">
                <h5><i className="fa fa-briefcase fa-fw w3-margin-right w3-large w3-text-teal" /><b>Department: </b><span id="dept">XYZ</span></h5>
                <h5><i className="fa fa-home fa-fw w3-margin-right w3-large w3-text-teal" />
                  <b>Year: </b><span id="year">000</span></h5>
                <hr />
                <p className="w3-large"><b><i className="fa fa-asterisk fa-fw w3-margin-right w3-text-teal" />Skills</b></p>
                <div id="skill-div">
                  <p className="skills w3-teal" id="speciality"> Speciality </p>
                </div>
                <div id="skill-wk">
                  <p className="mt-3 skills w3-teal">Wicket Keeper: <span id='wk'></span></p>
                </div>
                <br />
              </div>
            </div><br />
            {/* End Left Column */}
            </div>

            {/* Right Column */}
                <div className="w3-twothird" id="right-column">
                <div className="w3-container w3-card w3-white w3-margin-bottom">
                <b>
                    <h2 className="w3-text-grey w3-padding-16 " id="player-name2">
                    <i className="fa fa-user fa-fw w3-margin-right w3-xxlarge w3-text-teal" />
                    Player Name</h2>
                </b>
                <hr />
                <div className="w3-container">
                    <h4 className="w3-opacity currentBidHeader"><b>Current Bid</b></h4>
                    <h1 className="w3-text-teal bid-display"><i className="fa fa-calendar fa-fw w3-margin-right" />
                    <span className="w3-tag w3-teal w3-round " id="bid-value">0000</span></h1> 
                    <hr />
                </div>
                <div className="w3-container">
                    <h4 className="w3-opacity currentBidHeader"><b>Bidding Team</b></h4>
                    <h1 className="w3-text-teal bid-display"><i className="fa fa-calendar fa-fw w3-margin-right" />
                    <b><span id="bidder-name">Unsold</span></b></h1>
                    <hr />
                </div>
                <div className="newbid-container">
                    <div className="newbid-div">
                    <input className="new-bid mr-3" id="new-bid-value" type="number" placeholder="Bid Amount" aria-label="New Bid" style={{width: '20%'}} />
                    <select name="languages" id="new-bidder-name" style={{padding: '8px'}}>
                        <option value="select">Select Bidder Name</option>
                        <option value={0}>RR</option>
                        <option value={1}>CSK</option>
                        <option value={2}>KKR</option>
                        <option value={3}>DC</option>
                        <option value={4}>RCB</option>
                        <option value={5}>SRH</option>
                    </select>
                    <button id="bid-button" onClick={bidButtonClick} className="btn btn-outline-primary ml-5" type="button" data-mdb-ripple-color="dark" style={{padding: '10px', paddingLeft: '20px', paddingRight: '20px'}}>
                        Update
                    </button>
                    </div>
                </div>
                <div className="reset-container">
                    <img src="reset.png" onClick={resetBtnClick} alt="Avatar" id="reset" height={40} width={40} style={{cursor: 'pointer'}} contextMenu="Reset" />
                </div>
                </div>
                <div className="w3-twothird">
                <button id="submit" type="button" className="btn btn-primary btn-rounded">Submit</button>
                </div>
                {/* End Right Column */}
            </div>
          </div>
        </div>
        </div>
        
        // <div>
        //     <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        //         <Grid item xs={6}>
        //             <div className="w3-third" id="left-column">
        //             <div className="w3-white w3-text-grey w3-card-4">
        //             <div className="w3-display-container">
        //                 <img className="center-cropped" src="default-image.png" style={{width: '100%', height: '400px'}} alt="Avatar" id="player-image" onerror="this.src=image-not-found.jpg" />
        //                 <div className="w3-display-bottomleft w3-container w3-text-black">
        //                 <h2 style={{color: 'aliceblue'}} id="player-name1">Player Name</h2>
        //                 </div>
        //             </div>
        //             <div className="w3-container mt-3">
        //                 <h5><i className="fa fa-briefcase fa-fw w3-margin-right w3-large w3-text-teal" /><b>Department: </b><span id="dept">XYZ</span></h5>
        //                 <h5><i className="fa fa-home fa-fw w3-margin-right w3-large w3-text-teal" />
        //                 <b>Year: </b><span id="year">000</span></h5>
        //                 <hr />
        //                 <p className="w3-large"><b><i className="fa fa-asterisk fa-fw w3-margin-right w3-text-teal" />Skills</b></p>
        //                 <div id="skill-div">
        //                 <p className="skills w3-teal" id="speciality">Speciality</p>
        //                 </div>
        //                 <div id="skill-wk">
        //                 <p className="mt-3 skills w3-teal">Wicket Keeper</p>
        //                 </div>
        //                 <br />
        //             </div>
        //             </div><br />
        //             </div>
        //         </Grid>
        //         <Grid item xs={6}>
        //             <div>2</div>
        //         </Grid>
        //         <Grid item xs={6}>
        //             <div>3</div>
        //         </Grid>
        //         <Grid item xs={6}>
        //             <div>4</div>
        //         </Grid>
        //         </Grid>
        // </div>
      );
}

export default AllEligiblePlayers;