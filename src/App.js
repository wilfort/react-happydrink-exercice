import React, { Component } from 'react';
import logo from './assets/logo.svg';
import './css/App.css';
// import Establishment from './components/establishments/Establishment';
import Rebase from 're-base';
import Establishment from './components/establishments/Establishment';
import appl from './Base';
var base = Rebase.createClass(appl.database());
// import { establishments } from './components/establishments/fixtures';


class App extends Component {

  constructor(props) {
    // Ne pas oublier d'appeler le constructeur père ! (Obligatoire)
    super(props);
    // On définit le state de notre component que l'on hérite de la classe "Component"
    // Cela remplace la fonction "getInitialState"
    this.state = {
        pseudo  : "Inconnu",
        searchStringUser: "",
        establishments: [
            
        ],barName:"",barDescription:""
    
    }
}
handleChange(e){
    this.setState({searchStringUser: e.target.value});
}
barNameChange(e){
    this.setState({barName: e.target.value});
}
barDescriptionChange(e){
    this.setState({barDescription: e.target.value});
}
// On définit la fonction appelée lors d'un clic sur le lien "Changer le pseudo !"
// la syntaxe  " nomFonction = () => {} " nous permet de conserver le contexte `this` du scope courant. (Ici, la classe App)
randomPseudo = () => {
    // On s'amuse un peu ;)
    let randomPseudo    = ""
    const possible      = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    const size          = Math.floor(Math.random() * 10) + 5
    for( let i=0; i < size; i++ ){
        randomPseudo += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    // On met à jour le state via la fonction "setState" héritée de la classe Component
    this.setState({
        pseudo : randomPseudo
    })
}
addBar = () =>{
    let randomId    = ""
    const possibleTab      = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    const size          = Math.floor(Math.random() * 10) + 20
    for( let i=0; i < size; i++ ){
        randomId += possibleTab.charAt(Math.floor(Math.random() * possibleTab.length))
    }
    
    const item= {
        id          : randomId,
        key : this.state.establishments.length,
        name        : this.state.barName,
        description : this.state.barDescription,
        compDisLik:0,
        compLik:0
    };
    this.setState({establishments:this.state.establishments.concat(item),barName:"",barDescription:""})
}

componentWillMount () {
//    const db = base.database().ref('bars');
//    const item= {
//     id          : "0890786GH",
//     name        : "Biberium",
//     description : "Un super bar karaoké"
// };
//    db.push(item);

    console.log("componentWillMount")
}

componentDidMount () {
    base.syncState(`/`, {
        context: this,
        state: 'establishments',
        asArray: true
    });
    console.log("componentDidMount")
}
  render() {
     console.log(this.state.establishments);
    const establishmentFilter = this.state.establishments.filter((searchText) => {
        let search = searchText.name + " " + searchText.description;
        return search.toLowerCase().match(this.state.searchStringUser);
    })

    const listEstablishment = establishmentFilter.map( (establishment) => {
        return (
            <Establishment
                key={ establishment.id }
                establishment={ establishment } // on n'a pas oublié la props "establishment" :)
                deltEst={this.deltBar}
            />
        )
    });
    return (
      <div className="App">
        <div className="App-header" style={{background:this.props.color}}>
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome "{ this.state.pseudo }" to { this.props.title }</h2>
        </div>
        <div className="App-intro">
                    <div><a onClick={ this.randomPseudo } >Changer le pseudo !</a> </div>
                    <br/>
                    <div>
                        <input type="text" placeholder="search" value={this.state.searchStringUser} onChange={this.handleChange.bind(this)} />
                    </div>
                    <br/>
                    <div>
                        
                        name : <input type="text" name="barName" id="barName" value={this.state.barName} onChange={this.barNameChange.bind(this)}/><br/>
                        description : <textarea name="barDescription" id="barDescription" cols="30" rows="3" value={this.state.barDescription} onChange={this.barDescriptionChange.bind(this)}></textarea><br/>
                        <button onClick={this.addBar}>ajouter un bar</button>
                    </div>
                    <section>
                        { listEstablishment }
                    </section>
                </div>
        </div>
    );
  }
}

export default App;
