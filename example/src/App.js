import React from 'react';

// Constants
import { simpleFields } from './constants/qbFields';

// Components
import QBuilder from '../../src/index';

// Initial, test query to supply to the component
const testQuery = {
  "id": "q-eYzqvRpGZWXoJXTSZQAtF",
  "rules": [
    {
      "id": "g-x2P0kgQPeepc9H_KF2VmA",
      "rules": [
        {
          "id": "r-zVFiaM-ofW-yRzmWzrWAG",
          "field": "firstName",
          "value": "something else",
          "operator": "ends with"
        },
        {
          "id": "r-2_ST2tJ0P0udMZh-_ioDG",
          "field": "firstName",
          "value": "Spongebob",
          "operator": "contains"
        },
        {
          "id": "g-zaS9TnPgMsXHVamt_W8Gr",
          "rules": [
            {
              "id": "r-PgSGthQCroLv8XUqV6h7u",
              "field": "users",
              "value": "123",
              "operator": "is"
            },
            {
              "id": "r-8q5KMtMNWxtTZv3S6lH5e",
              "field": "firstName",
              "value": "Alex Banana",
              "operator": "="
            }
          ],
          "combinator": "OR",
          "not": false
        }
      ],
      "combinator": "AND",
      "not": false
    }
  ]
};


class App extends React.Component {

  state = {
    simpleQuery: '',
    initialQuery: null,
  };

  onSimpleQueryChange = queryJson => {
    this.setState({
      simpleQuery: JSON.stringify(queryJson, null, 4)
    });
  };

  handleQueryLoadClick = () => {
    this.setState({
      initialQuery: testQuery
    });
  };

  handleResetClick = () => {
    this.setState({
      initialQuery: null
    });
  };

  render() {
    return (
      <div className="App">
        <h1>React Query Builder demo</h1>
        <p>Have a play about and see the query built and updated in real time below...</p>
        <p>
          <button onClick={this.handleQueryLoadClick}>Load existing query</button>
          <button onClick={this.handleResetClick}>Reset</button>
        </p>
        <hr />
        <QBuilder
          fields={simpleFields.fields}
          combinators={simpleFields.combinators}
          onQueryChange={this.onSimpleQueryChange}
          query={this.state.initialQuery}
          useCustomStyles={false}
        />
        <hr />
        <section className="section">
          <code>
            <pre>{this.state.simpleQuery}</pre>
          </code>
        </section>
      </div>
    );
  }
};

export default App;