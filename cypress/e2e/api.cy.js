const API_URL = 'https://restful-booker.herokuapp.com/';
const BOOKING_URL = 'booking';
const AUTH_URL = 'auth';
describe('Booking', () => {
  context("creation", () => {
    it('can create booking', () => {
      cy.request(createBookingOptions)
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('bookingid');
          expect(response.body.bookingid.length).to.not.be.eq
        })
    });
    it('cannot create booking without correct headers', () => {
      const reqOptions = {
        ...createBookingOptions,
        failOnStatusCode: false,
        headers: { 'Content-Type': '' }
      };
      cy.request(reqOptions)
        .its('status')
        .should("eq", 500)
    });
  });
  context("deletion", () => {
    beforeEach(() => {
      cy.request(createBookingOptions)
        .its('body.bookingid')
        .then(getDeleteBookingOptions)
        .as('deleteOptions');
    })
    it('can delete booking when authorized', function () {
      cy.request(this.deleteOptions)
        .its('status')
        .should("eq", 201)
    });
    it('cannot delete booking when not authorized', function () {
      delete this.deleteOptions.auth;
      this.deleteOptions.failOnStatusCode = false;
      cy.request(this.deleteOptions)
        .its('status')
        .should("eq", 403)
    })
  });
});

const getDeleteBookingOptions = (id) => {
  return {
    method: 'DELETE',
    url: `${API_URL}${BOOKING_URL}/${id}`,
    auth: {
      username: 'admin',
      password: 'password123'
    }
  }
}

const createBookingOptions = {
  method: 'POST',
  url: `${API_URL}${BOOKING_URL}`,
  body: {
    "firstname": "Jim",
    "lastname": "Brown",
    "totalprice": 111,
    "depositpaid": true,
    "bookingdates": {
      "checkin": "2018-01-01",
      "checkout": "2019-01-01"
    }
  },
  headers: { 'Content-Type': 'application/json' }
}
