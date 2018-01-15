import React, { Component } from 'react';
import { Table, Container, Button, Header } from 'semantic-ui-react';
import json from './simulations';

const BTC_VALUE = 13874;

const betterValue = json.sort((a, b) => a.final - b.final).reverse();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { filter: '' };
  }

  setFilter = filter => () => {
    this.setState({filter});
  };

  render() {
    const filtred = betterValue.filter(item => item.name.includes(this.state.filter));

    return (
      <Container>
        <br />
        <Header>Initial Value: US${(BTC_VALUE * 0.1).toFixed(2)}</Header>
        <Button.Group>
          <Button onClick={this.setFilter('')}>Todos</Button>
          <Button onClick={this.setFilter(' 5m')}>5 Minutos</Button>
          <Button onClick={this.setFilter(' 15m')}>15 Minutos</Button>
          <Button onClick={this.setFilter(' 30m')}>30 Minutos</Button>
          <Button onClick={this.setFilter(' 1h')}>1 Hora</Button>
          <Button onClick={this.setFilter(' 1d')}>1 Dia</Button>
        </Button.Group>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>BTC</Table.HeaderCell>
              <Table.HeaderCell>MTK</Table.HeaderCell>
              <Table.HeaderCell>Final</Table.HeaderCell>
              <Table.HeaderCell>Transactions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {filtred.map( (item, ix) => (
              <Table.Row positive={item.final > 0.1} negative={item.final < 0.1}>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.btc}</Table.Cell>
                <Table.Cell>{item.mkt}</Table.Cell>
                <Table.Cell>US$ {(item.final * BTC_VALUE).toFixed(2)}</Table.Cell>
                <Table.Cell>{item.transactions.length}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <br />
      </Container>
    );
  }
}

export default App;
