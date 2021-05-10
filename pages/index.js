import UIBUtton from '../styles/UIKit/Button'
import styled from "styled-components";

const Home = () => (
<Container>
<div className="hero">
<h1 className="title">HOT RIGHT NOW</h1>
<p className="description">Create your ever evolving wardrobe with 500+ styles to discover</p>
<UIBUtton size="md" inverted>BUILD YOUR WARDROBE</UIBUtton>
</div>
</Container>
);

export default Home;

const Container = styled.div`
.hero {
  height: 87vh;
  width: 100vw;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.title {
  font-size: 4.8rem;
  margin: 0;
}
.description {
  font-size: 1.8rem;
  margin: 1rem;
}
.button {
  margin: 1rem;
}
`;
