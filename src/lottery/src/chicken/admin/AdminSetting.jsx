import React, { useState } from 'react'
import axiosInstance from '../utils/axiosInstance';

const AdminSetting = () => {


  const [formData, setFormData] = useState({
    name: '',
    file: null,
  });

  const apiUrl = import.meta.env.VITE_API_URL;


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    console.log('Submitting data:', formData);

    try {
      // const response = await fetch(`${apiUrl}/user/deposit-method`, {
      //   method: 'POST',
      //   body: data,
      // });

      // const result = await response.json();
      // alert(result.message || 'Detail submitted successfully!');
      const response = await axiosInstance.post(`${apiUrl}/user/deposit-method`, data);

      alert(response.data.message || 'Detail submitted successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting the form');
    }
  };


    // Second Form State (Telegram Form)
    const [telegramData, setTelegramData] = useState({
      telegram: '',
    });


    const handleTelegramChange = (e) => {
      const { name, value } = e.target;
      setTelegramData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    console.log(telegramData,"tdatat")

    const handleTelegramSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axiosInstance.post(`${apiUrl}/user/telegram-link`, telegramData);
        alert(response.data.message || 'Telegram link submitted!');
      } catch (error) {
        console.error('Telegram Error:', error);
        alert('Error submitting telegram data');
      }
    };

  return (
    <div>
      <div className="container mt-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: '600px' }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
            Upi id
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="file-upload" className="form-label">
              Upload QR Code Image
            </label>
            <input
              type="file"
              className="form-control"
              id="file-upload"
              name="file"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-bold">
            Send Now
          </button>
        </form>
      </div>








    </div>




    <div className="container mt-5">
        <div className="card shadow p-4 mx-auto" style={{ maxWidth: '600px' }}>
          <form onSubmit={handleTelegramSubmit}>
            <div className="mb-3">
              <label htmlFor="telegram" className="form-label">
                Telegram Link
              </label>
              <input
                type="text"
                className="form-control"
                id="telegram"
                name="telegram"
                value={telegramData.telegram}
                onChange={handleTelegramChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-success w-100 fw-bold">
              Submit 
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminSetting
