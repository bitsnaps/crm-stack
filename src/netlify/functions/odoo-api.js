// Simulated data storage
let contacts = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210' },
];

let opportunities = [
  { id: 1, name: 'Big Sale', amount: 10000, stage: 'New' },
  { id: 2, name: 'Medium Deal', amount: 5000, stage: 'Qualified' },
];

exports.handler = async (event, context) => {
  const path = event.path.replace('/.netlify/functions/odoo-api', '');
  const method = event.httpMethod;

  try {
    switch (`${method} ${path}`) {
      case 'GET /dashboard':
        return {
          statusCode: 200,
          body: JSON.stringify({
            totalContacts: contacts.length,
            totalOpportunities: opportunities.length,
            totalRevenue: opportunities.reduce((sum, opp) => sum + opp.amount, 0),
          }),
        };

      case 'GET /contacts':
        return {
          statusCode: 200,
          body: JSON.stringify(contacts),
        };

      case 'POST /contacts':
        const newContact = JSON.parse(event.body);
        newContact.id = contacts.length + 1;
        contacts.push(newContact);
        return {
          statusCode: 201,
          body: JSON.stringify({ id: newContact.id }),
        };

      case 'GET /opportunities':
        return {
          statusCode: 200,
          body: JSON.stringify(opportunities),
        };

      case 'POST /opportunities':
        const newOpportunity = JSON.parse(event.body);
        newOpportunity.id = opportunities.length + 1;
        opportunities.push(newOpportunity);
        return {
          statusCode: 201,
          body: JSON.stringify({ id: newOpportunity.id }),
        };

      default:
        return {
          statusCode: 404,
          body: 'Not Found',
        };
    }
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};