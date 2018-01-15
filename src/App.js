import React, { Component } from 'react';
import { Table, Container, Button, Header, Modal, Icon, Dropdown } from 'semantic-ui-react';
import json10_90 from './simulations90-10';
import json20_80 from './simulations80-20';
import json30_70 from './simulations70-30';
import json40_60 from './simulations60-40';

const BTC_VALUE = 13874;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { filter: '', modalOpen: false, transactions: [], json: [], type: 3 };
  }

  componentDidMount() {
    this.getTransactions();
  }

  getTransactions = () => {
    const types = {
      1: json10_90,
      2: json20_80,
      3: json30_70,
      4: json40_60,
    };

    const json = types[this.state.type].sort((a, b) => a.final - b.final).reverse();
    this.setState({json});
  };

  handleChange = (e, { name, value }) => {
    const types = {
      1: json10_90,
      2: json20_80,
      3: json30_70,
      4: json40_60,
    };

    const json = types[value].sort((a, b) => a.final - b.final).reverse();
    this.setState({json});
    this.setState({ type: value, json })

  };

  setFilter = filter => () => {
    this.setState({filter});
  };

  handleOpen = transactions => () => this.setState({ modalOpen: true, transactions });

  handleClose = () => this.setState({ modalOpen: false, transactions: [] });

  render() {
    const filtred = this.state.json.filter(item => item.name.includes(this.state.filter));
    const rsiTypes = [
      { value: 1, text: 'Min 10 and Max 90' },
      { value: 2, text: 'Min 20 and Max 80' },
      { value: 3, text: 'Min 30 and Max 70' },
      { value: 4, text: 'Min 40 and Max 60' },
    ];

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
        </Button.Group>&nbsp;&nbsp;
        <Dropdown placeholder='Select RSI Value' selection options={rsiTypes} onChange={this.handleChange} />
        <Table celled unstackable>
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
                <Table.Cell>
                  <Button onClick={this.handleOpen(item.transactions)}>{item.transactions.length}</Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <Modal
          open={this.state.modalOpen}
          onClose={this.handleClose}
        >
          <Header icon='browser' content='List Of Transactions' />
          <Modal.Content>
            <Table celled unstackable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Op</Table.HeaderCell>
                  <Table.HeaderCell>Qnt</Table.HeaderCell>
                  <Table.HeaderCell>Value</Table.HeaderCell>
                  <Table.HeaderCell>Date</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {this.state.transactions.map((op, ix) => (
                  <Table.Row positive={op.op === 1} negative={op.op === 2}>
                    <Table.Cell>{op.op === 1 ? 'Buy' : 'Sell'}</Table.Cell>
                    <Table.Cell>{op.qnt}</Table.Cell>
                    <Table.Cell>{op.value}</Table.Cell>
                    <Table.Cell>{op.date}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>

          </Modal.Content>
          <Modal.Actions>
            <Button color='green' onClick={this.handleClose}>
              <Icon name='checkmark' /> Close
            </Button>
          </Modal.Actions>
        </Modal>
        <br />
      </Container>
    );
  }
}

export default App;
