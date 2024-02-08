import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBBtn
} from 'mdb-react-ui-kit';


export default function Footer() {
  return (
    <MDBFooter className='bg-dark text-center text-white'>
      <MDBContainer className='p-4 pb-0'>
        <section className='mb-4'>
            RyoTen Luxury is a premier platform based in Japan, specializing in the resale
            of refurbished luxurious goods, high-end apparels, exquisite watches, and
            other fashion commodities. The major work is to chunk all the orders
            (commodities bought by users) from different merchants worldwide and
            import them in India all together to save the import tax duty.
        </section>
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2020 Copyright:{" "}
        <a className='text-white' href='https://mdbootstrap.com/'>
          RyoTen-Luxury.com
        </a>
      </div>
    </MDBFooter>
  );
}