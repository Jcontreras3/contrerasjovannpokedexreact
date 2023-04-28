import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./pokeStyles.css";
import { gettingPokemon } from "../Data/PokeData";
import { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";

export default function PokePage() {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  const [searchPoke, setSearchPoke] = useState("charmander");
  const [pokeImg, setPokeImg] = useState();
  const [pokeName, setPokeName] = useState("");
  const [pokeMove, setPokeMove] = useState("");
  const [pokeType, setPokeType] = useState("");
  const [pokeImgBack, setPokeImgBack] = useState("");
  const [pokeImgShiny, setPokeImgShiny] = useState();
  const [pokeImgShinyBack, setPokeImgShinyBack] = useState();

  const GetPokeData = async () => {
    let pokeMon = await gettingPokemon(searchPoke);
    setPokeImg(pokeMon.sprites.front_default);
    setPokeName(pokeMon.name);
    setPokeMove(pokeMon.moves.map((move) => move.move.name).join(", "));
    setPokeType(pokeMon.types.map((type) => type.type.name).join(", "));
    setPokeImgBack(pokeMon.sprites.back_default);
    setPokeImgShiny(pokeMon.sprites.front_shiny);
    setPokeImgShinyBack(pokeMon.sprites.back_shiny);
  };
  
  

  useEffect(() => {
    GetPokeData();
  }, []);

  return (
    <Container className="pokeCont">
      <Row>
        <div className="navBar">
          <p className="titleTxt">
            Pokemon Generator! Created By: Jovann Contreras{" "}
          </p>
          <input
            onChange={(e) => {
              setSearchPoke(e.target.value.toLowerCase());
              console.log(searchPoke);
            }}
            className="inputPoke"
            placeholder="Search For Pokemon"
          />
          <button onClick={GetPokeData} className="srchBtn">
            Search
          </button>
          <Button className="srchBtn" ref={target} onClick={() => setShow(!show)}>
            How to use
          </Button>
          <Overlay target={target.current} show={show} placement="right">
            {(props) => (
              <Tooltip id="overlay-example" {...props}>
                Type in any pokemon to see its stats!
              </Tooltip>
            )}
          </Overlay>
        </div>
        <div className="test2">
          <Col className="redBx">
            <p className="pokeNameStyle">Pokemon Name: {pokeName}</p>
            <p className="pokeTypeStyle">Pokemon Type: {pokeType}</p>
            <p className="pokeMoveStyle">Pokemon Moves: {pokeMove}</p>
          </Col>
          <Col className="imgGroup">
            <img className="imgStyles" src={pokeImg} />
            <img className="imgStyles" src={pokeImgBack} />
            <img className="imgStyles" src={pokeImgShiny} />
            <img className="imgStyles" src={pokeImgShinyBack} />
          </Col>
        </div>
      </Row>
      <Row>
        <div>
          <p></p>
        </div>
      </Row>
    </Container>
  );
}