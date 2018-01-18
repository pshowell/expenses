import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Expenses extends Component {
  state = {
    expenses: [],
    category: "",
    date: "",
    vendor: "",
    description:"",
    total:""
  };

  componentDidMount() {
    this.loadExpenses();
  }

  loadExpenses = () => {
    API.getExpenses()
      .then(res =>
        this.setState({ expenses: res.data, category: "", date: "", vendor: "", description:"", total:"" })
      )
      .catch(err => console.log(err));
  };

  deleteExpense = id => {
    API.deleteExpense(id)
      .then(res => this.loadExpenses())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.category && this.state.total) {
      API.saveExpense({
        category: this.state.category,
        date: this.state.date,
        vendor: this.state.vendor,
        description: this.state.description,
        total: this.state.total
      })
        .then(res => this.loadExpenses())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Create a New Expense Report</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.category}
                onChange={this.handleInputChange}
                name="category"
                placeholder="Category (required)"
              />
              <Input
                value={this.state.date}
                onChange={this.handleInputChange}
                name="date"
                placeholder="Date (required)"
              />
              <Input
                value={this.state.vendor}
                onChange={this.handleInputChange}
                name="vendor"
                placeholder="Vendor (required)"
              />
              <TextArea
                value={this.state.description}
                onChange={this.handleInputChange}
                name="description"
                placeholder="Description (Optional)"
              />
              <Input
                value={this.state.total}
                onChange={this.handleInputChange} 
                name="total"
                placeholder="Total (required)"
              />
              <FormBtn
                disabled={!(this.state.total && this.state.category)}
                onClick={this.handleFormSubmit}
              >
                Submit Expense
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Recent Expenses</h1>
            </Jumbotron>
            {this.state.expenses.length ? (
              <List>
                {this.state.expenses.map(expense => (
                  <ListItem key={expense._id}>
                    <Link to={"/expenses/" + expense._id}>
                      <strong>
                        {expense.category} by {expense.total}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteExpense(expense._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Expenses;
