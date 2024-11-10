import {el, setChildren} from 'redom';

const createCard = () => {
  const cardNumberDisplay =
   el('span', {className: 'card__number'}, 'xxxx xxxx xxxx xxxx');
  const cardHolderDisplay =
   el('span', {className: 'card__name'}, 'John Doe');
  const cardExpiryDisplay =
   el('span', {className: 'card__date'}, '04/24');

  const updateDisplay = (input, displayElement, placeholder) => {
    displayElement.textContent = input.value || placeholder;
  };

  const wrapper = el('div', {className: 'wrapper'},

      el('div', {className: 'card'},
          el('p', {className: 'secure'}, 'Secure Checkout'),

          el('div', {className: 'credit-card'},
              cardNumberDisplay,
              el('div', {className: 'card__personal'},
                  cardHolderDisplay,
                  cardExpiryDisplay,
              ),
          ),

          el('form', {className: 'form', id: 'form'},
              el('div', {className: 'form__input-wrap form__input-wrap_holder'},
                  el('label',
                      {className:
                         'form__label form__holder-label'}, 'Card Holder'),
                  el('input', {
                    className: 'input input__holder',
                    type: 'text',
                    maxlength: 30,
                    oninput: (e) => {
                      e.target.value =
                       e.target.value.replace(/[^a-zA-Z\s]/g, '');
                      if (e.target.value.length > 30) {
                        e.target.value = e.target.value.slice(0, 30);
                      }
                      e.target.value =
                       e.target.value.replace(/\b\w/g,
                           (char) => char.toUpperCase());
                      updateDisplay(e.target, cardHolderDisplay, 'John Doe');
                    },
                  }),
              ),

              el('div', {className:
                 'form__input-wrap form__input-wrap_number'},
              el('label', {className:
                    'form__label form__number-label'}, 'Card Number'),
              el('input', {
                className: 'input input__number',
                type: 'text',
                onfocus: (e) => {
                  e.target.placeholder = 'xxxx xxxx xxxx xxxx';
                },
                onblur: (e) => {
                  e.target.placeholder = '';
                },
                oninput: (e) => {
                  let value = e.target.value.replace(/\D/g, '');
                  if (value.length > 16) {
                    value = value.slice(0, 16);
                  }
                  e.target.value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
                  updateDisplay(e.target,
                      cardNumberDisplay, 'xxxx xxxx xxxx xxxx');
                },
              }),
              ),

              el('div', {className: 'form__input-wrap form__input-wrap_date'},
                  el('label', {className:
                     'form__label form__date-label'}, 'Card Expiry'),
                  el('input', {
                    className: 'input input__date',
                    type: 'text',
                    oninput: (e) => {
                      let value = e.target.value.replace(/\D/g, '');
                      if (value.length > 4) {
                        value = value.slice(0, 4);
                      }
                      if (value.length >= 3) {
                        value = value.replace(/(\d{2})(\d{1,2})/, '$1/$2');
                      }
                      e.target.value = value;
                      updateDisplay(e.target, cardExpiryDisplay, '04/24');
                    },
                  }),
              ),

              el('div', {className: 'form__input-wrap form__input-wrap_cvv'},
                  el('label', {className:
                     'form__label form__cvv-label'}, 'CVV'),
                  el('input', {
                    className: 'input input__cvv',
                    type: 'text',
                    maxlength: 3,
                    onfocus: (e) => {
                      e.target.value = '';
                      e.target.placeholder = '___';
                    },
                    onblur: (e) => {
                      if (!e.target.value) {
                        e.target.placeholder = '';
                      }
                    },
                    oninput: (e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      e.target.value = value.slice(0, 3);
                    },
                  }),
              ),

              el('button', {className:
                 'form__button', type: 'submit'}, 'CHECK OUT'),
          ),
      ),
  );

  return wrapper;
};

setChildren(document.body, createCard());
