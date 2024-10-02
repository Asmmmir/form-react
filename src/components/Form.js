import React, { useState } from "react";
import Calendar from "react-calendar";
import "@fortawesome/fontawesome-free/css/all.min.css";
import InputMask from "react-input-mask";

function Form() {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [calendarValue, setCalendarValue] = useState(null);
  const [errors, setErrors] = useState({});

  const [formValues, setFormValues] = useState({
    lastName: "",
    firstName: "",
    middleName: "",
    gender: "male",
    dateOfBirth: '',
    phone: "",
    email: "",
    address: "",
    employer: "",
  });

  const validate = () => {
    let tempErrors = {};
    if (!formValues.lastName)
      tempErrors.lastName = "Поле является обязательным";
    if (!formValues.firstName)
      tempErrors.firstName = "Поле является обязательным";
    if (!formValues.phone) tempErrors.phone = "Поле является обязательным";
    if (
      formValues.phone &&
      !/^\+7\(\d{3}\)-\d{3}-\d{2}-\d{2}$/.test(formValues.phone)
    )
      tempErrors.phone = "Некорректный номер телефона";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formValues.email))
      tempErrors.email = "Некорректный email";

    if(!formValues.dateOfBirth) tempErrors.dateOfBirth = 'Поле является обязательным'
    if (!formValues.address) tempErrors.address = "Поле является обязательным";
    if (!formValues.employer)
      tempErrors.employer = "Поле является обязательным";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleDateChange = (date) => {
    setCalendarValue(date);
    setFormValues({
      ...formValues,
      dateOfBirth: date.toLocaleDateString(),
    });
    setCalendarOpen(false);
    setErrors({
      ...errors,
      dateOfBirth: ''
    })
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert('Форма валидна, отправляется запрос')
      console.log(formValues);
    } else {
      console.log("Валидация провалилась");
    }
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <h2 className="title">Информация о сотруднике</h2>
        <form onSubmit={handleSubmit} className="form">
          <input
            onChange={handleInputChange}
            className={errors.lastName ? "error-input" : ""}
            name="lastName"
            type="text"
            placeholder="Фамилия"
          />
          {errors.lastName && (
            <span className="error-message">{errors.lastName}</span>
          )}
          <input
            onChange={handleInputChange}
            className={errors.firstName ? "error-input" : ""}
            name="firstName"
            type="text"
            placeholder="Имя"
          />
          {errors.firstName && (
            <span className="error-message">{errors.firstName}</span>
          )}
          <input
            onChange={handleInputChange}
            name="middleName"
            type="text"
            placeholder="Отчество"
          />
          <div className="form__secondary">
            <div className="form__secondary-item">
              <select
                onChange={handleInputChange}
                className="form__secondary-gender"
                name="gender"
              >
                <option value="male">Мужской</option>
                <option value="female">Женский</option>
              </select>
            </div>
            <div className="form__secondary-birthday">
              <input
                onClick={() => setCalendarOpen((prev) => !prev)}
                className={errors.dateOfBirth ? 'error-input' : ''}
                name="birthday"
                type="text"
                placeholder="Дата рождения"
                value={calendarValue ? new Date(calendarValue).toLocaleDateString() : null}
              />
              {errors.dateOfBirth ? (<span className="error-message">{errors.dateOfBirth}</span>) : ''}
              {calendarOpen && (
                <Calendar
                  value={calendarValue}
                  onChange={handleDateChange}
                  locale="ru-RU"
                />
              )}
              <i className="fas fa-calendar-alt"></i>
            </div>
            <div className="form__secondary-item">
              <InputMask
                mask="+7(999)-999-99-99"
                value={formValues.phone}
                onChange={handleInputChange}
              >
                {() => (
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Мобильный телефон"
                    className={errors.phone ? "error-input" : ""}
                  />
                )}
              </InputMask>
              {errors.phone && (
            <span className="error-message">{errors.phone}</span>
          )}
            </div>
            <div>
              <input
                onChange={handleInputChange}
                className={errors.email ? 'error-input' : ''}
                name="email"
                type=""
                placeholder="Email"
              />
              {errors.email && (<span className="error-message">{errors.email}</span>)}
            </div>
          </div>
          <input
            onChange={handleInputChange}
            className={errors.address ? "error-input" : ""}
            name="address"
            type="text"
            placeholder="Адрес постоянной регистрации"
          />
          {errors.address && (
            <span className="error-message">{errors.address}</span>
          )}
          <input
            onChange={handleInputChange}
            className={errors.employer ? "error-input" : ""}
            name="employer"
            type="text"
            placeholder="Название работодателя"
          />
         {errors.employer && (
            <span className="error-message">{errors.employer}</span>
          )}
          <button className="form__submit">Сохранить</button>
        </form>
      </div>
    </div>
  );
}

export default Form;
