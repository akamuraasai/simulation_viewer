import React, { Component } from 'react';
import { Table, Container, Button, Header, Modal, Icon, Dropdown } from 'semantic-ui-react';
import json10_90_7 from './simulations90-10_7';
import json20_80_7 from './simulations80-20_7';
import json30_70_7 from './simulations70-30_7';
import json40_60_7 from './simulations60-40_7';
import json10_90_14 from './simulations90-10_14';
import json20_80_14 from './simulations80-20_14';
import json30_70_14 from './simulations70-30_14';
import json40_60_14 from './simulations60-40_14';
import json10_90_20 from './simulations90-10_20';
import json20_80_20 from './simulations80-20_20';
import json30_70_20 from './simulations70-30_20';
import json40_60_20 from './simulations60-40_20';
import json10_90_30 from './simulations90-10_30';
import json20_80_30 from './simulations80-20_30';
import json30_70_30 from './simulations70-30_30';
import json40_60_30 from './simulations60-40_30';

const BTC_VALUE = 13874;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { filter: '', modalOpen: false, transactions: [], json: [], type: 11 };
  }

  handleChange = (e, { name, value }) => {
    const types = {
      1: json10_90_7,
      2: json20_80_7,
      3: json30_70_7,
      4: json40_60_7,
      5: json10_90_14,
      6: json20_80_14,
      7: json30_70_14,
      8: json40_60_14,
      9: json10_90_20,
      10: json20_80_20,
      11: json30_70_20,
      12: json40_60_20,
      13: json10_90_30,
      14: json20_80_30,
      15: json30_70_30,
      16: json40_60_30,
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
      { value: 1, text: '7 days - Min 10 and Max 90' },
      { value: 2, text: '7 days - Min 20 and Max 80' },
      { value: 3, text: '7 days - Min 30 and Max 70' },
      { value: 4, text: '7 days - Min 40 and Max 60' },
      { value: 5, text: '14 days - Min 10 and Max 90' },
      { value: 6, text: '14 days - Min 20 and Max 80' },
      { value: 7, text: '14 days - Min 30 and Max 70' },
      { value: 8, text: '14 days - Min 40 and Max 60' },
      { value: 9, text: '20 days - Min 10 and Max 90' },
      { value: 10, text: '20 days - Min 20 and Max 80' },
      { value: 11, text: '20 days - Min 30 and Max 70' },
      { value: 12, text: '20 days - Min 40 and Max 60' },
      { value: 13, text: '30 days - Min 10 and Max 90' },
      { value: 14, text: '30 days - Min 20 and Max 80' },
      { value: 15, text: '30 days - Min 30 and Max 70' },
      { value: 16, text: '30 days - Min 40 and Max 60' },
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
