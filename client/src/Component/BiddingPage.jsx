import { useState, useEffect } from 'react';
import { Table, TableHead, TableCell, Paper, TableRow, TableBody, Button, styled, Grid} from '@mui/material'
import { getEligiblePlayers, editTeam , getTeams} from '../Service/api';
import { editPlayer } from '../Service/api';

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


const AllEligiblePlayers = () => {

    let playerIdx=0;
    let teamIdx = -1;
    const maxPoint = 2000;
    let currentBidderTeam = {
      name: '',
      pointsUsed: 0,
      playerList: [],
  }

    const [players, setPlayers] = useState();
    const [teams, setTeams] = useState();
    
    useEffect(() => {
        getAllPlayers();
         getAllTeams();
    }, []);

    const getAllPlayers = async () => {
        try {
            let response = await getEligiblePlayers();

            setPlayers(response.data);

            console.log("Players fetched!");
        } catch (error) {
            console.log("getAllPlayers error: ", error);
        }
        
    }

    const getAllTeams = async () => {
      try {
          let response2 = await getTeams();

          setTeams(response2.data);
          console.log("Teams fetched!");
          console.log(response2.data);

      } catch (error) {
          console.log("getAllTeams error: ", error);
      }
      
  }

    const clickedStartBtn = ()=>{

        const playersCount = players.length;
        
        if(playersCount == 0){
          alert("No more players");
        }
        else if(window.confirm('Do you want to start the bidding?')){

          playerIdx = Math.floor(Math.random() * playersCount); // generating random index 

          console.log('Total players count : ', playersCount );
          console.log('Random index: ', playerIdx);
          const name = document.querySelectorAll('#player-name1')[0];
          const name2=document.getElementById("player-name2");
          const year = document.querySelectorAll('#year')[0];
          const dept = document.querySelectorAll('#dept')[0];
          const speciality = document.querySelectorAll('#speciality')[0];
          const wk = document.querySelectorAll('#wk')[0];
          name.innerHTML = `${players[playerIdx].name}`;
          name2.innerHTML = `${players[playerIdx].name}`;
          year.innerHTML = `${players[playerIdx].year}`;
          dept.innerHTML = `${players[playerIdx].dept}`;
          speciality.innerHTML = `${players[playerIdx].speciality}`;
          wk.innerHTML = `${players[playerIdx].wk}`;
        }
    }




        const bidValue=document.getElementById("bid-value");
        const bidderName=document.getElementById("bidder-name");
        const newBidValue=document.getElementById("new-bid-value");
        const newBidderName=document.getElementById("new-bidder-name");
        const teamNames=["RR","CSK","KKR","DC","RCB","SRH"];

        // on update button click
        //let bidderIndex=0;
        const bidButtonClick= ()=>{

          try {
            const newBidVal=newBidValue.value;
            const currIdx=parseInt(newBidderName.value);
            const tempBidderTeam = teams[currIdx];
            const bidder=teamNames[currIdx];
            //const bidder=newBidderName.value;
            const remainingPoint = maxPoint - parseInt(tempBidderTeam.pointsUsed);
            const newPoint = parseInt(tempBidderTeam.pointsUsed) + parseInt(newBidVal);

            if(newBidVal==''){
              alert('Bid Value Field Empty!')
            }
            else if(bidder=='select'){
              alert('Select the Bidder!')
            }
            else if(parseInt(newBidVal) < parseInt(bidValue.innerText)){ 
              alert("current bid value less than previous bid!"); 
            } 
            else if(newPoint > maxPoint){
              alert("Not enough point!, Team only has "+ remainingPoint + " point remaining.");
            }
            else{
              //bidderIndex=parseInt(newBidderName.value);
              //console.log(bidderIndex);
              bidValue.innerHTML=newBidVal;
              bidderName.innerHTML=bidder;
              newBidValue.value="";
              newBidderName.value="select";

              currentBidderTeam = teams[currIdx];
              teamIdx = currIdx;
            }
          } catch (error) {
            
            alert('Player Data not fetched yet');
            console.log('Error on update button click: ',error);

          }
      } // end of update button functionality

      // on rest button click
      const resetBtnClick = ()=>{
        if(window.confirm("Are you sure you want to reset?")){
          bidValue.innerHTML="0000";
          bidderName.innerHTML="Unsold";
          newBidValue.value="";
          newBidderName.value="select";
        }
      } //end reset button functionality


      const submitButtonClick = async ()=>{
        if(teamIdx < 0){
          alert("Update the bidding data before submit!");
        }
        else if(window.confirm("Are you sure you want to submit?")){
          try {
            
            const newTeamValue = {
              name: '',
              pointsUsed: 0,
              playerList: [],
            }

            let newPlayervalue = {
              name: '',
              dept: '',
              year: '',
              speciality: '',
              wk: '',
              registered: '',
              soldto: ''
            }

            const soldPlayerDetails = {
                  name: '',
                  dept: '',
                  year: '',
                  speciality: '',
                  wk: '',
                  point: 0,
            }

            const pointsUsed = parseInt(bidValue.innerHTML);
            soldPlayerDetails.name = players[playerIdx].name;
            soldPlayerDetails.dept = players[playerIdx].dept;
            soldPlayerDetails.year = players[playerIdx].year;
            soldPlayerDetails.speciality = players[playerIdx].speciality;
            soldPlayerDetails.wk = players[playerIdx].wk;
            soldPlayerDetails.point = parseInt(pointsUsed);
            
            //const teamIdx = parseInt(newBidderName.value);
            newTeamValue.name= teams[teamIdx].name;
            newTeamValue.pointsUsed=teams[teamIdx].pointsUsed + pointsUsed;
            newTeamValue.playerList = teams[teamIdx].playerList;
            newTeamValue.playerList.push(soldPlayerDetails);

            console.log("Player Sold: ", newTeamValue);
            
            await editTeam(teamIdx,newTeamValue);
            await getAllPlayers();
            await getAllTeams();

            newPlayervalue = players[playerIdx];
            newPlayervalue.soldto = newTeamValue.name;

            await editPlayer(newPlayervalue._id, newPlayervalue);
            
            alert(newPlayervalue.name + " got sold to "+ newTeamValue.name+ " for "+ pointsUsed);

            window.location.reload(false);
            

          } catch (error) {
            console.log("Error in submitButtonClick: ",error);
          }
        }
      }

    return (

        <div>

            {/*Navbar */}
      <nav className="mb-1 navbar navbar-expand-lg navbar-dark default-color" id="nav">
        
        <div className="collapse navbar-collapse" id="navbarSupportedContent-333">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#" id="start" onClick={() => clickedStartBtn()}>Start Bidding
                {/* <span class="sr-only">(current)</span>  */}
              </a>
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
                  <h2 style={{color: 'aliceblue'}} id="player-name1">Player Name</h2>
                </div>
              </div>
              <div className="w3-container mt-3">
                <h5><i className="fa fa-briefcase fa-fw w3-margin-right w3-large w3-text-teal" /><b>Department: </b><span id="dept">XYZ</span></h5>
                <h5><i className="fa fa-home fa-fw w3-margin-right w3-large w3-text-teal" />
                  <b>Year: </b><span id="year">000</span></h5>
                <hr />
                <p className="w3-large"><b><i className="fa fa-asterisk fa-fw w3-margin-right w3-text-teal" />Skills</b></p>
                <div id="skill-div">
                  <b><p className="skills w3-teal" id="speciality"> Speciality </p></b>
                </div>
                <div id="skill-wk">
                  <b><p className="mt-3 skills w3-teal">Wicket Keeper: <span id='wk'></span></p></b>
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
                <button id="submit" onClick={submitButtonClick} type="button" className="btn btn-primary btn-rounded">Submit</button>
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