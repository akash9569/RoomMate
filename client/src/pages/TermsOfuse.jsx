import React from "react";
import Navbar from "../components/NavbarComponent";
import Footer from "../components/Footer";

const TermsOfuse = () => {
  return (
    <>
      <Navbar />
      <div
        style={{
          marginTop: "120px",
          marginBottom: "50px",
          padding: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            width: "100%",
            backgroundColor: "#fff",
            padding: "30px 40px",
            borderRadius: "12px",
            boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
            color: "#333",
            lineHeight: "1.7",
            fontSize: "16px",
          }}
        >
          <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
            Terms of Use
          </h1>

          <section>
            <p>
              Welcome to RoomMate. These Terms of Use ("Terms") govern your
              access to and use of our website, services, and applications
              (collectively, the "Service"). Please read them carefully before
              using the Service.
            </p>

            <p>
              These terms and conditions (the "Terms") constitute a legally
              binding contract between you, the user, and us. Please take the
              time to read these Terms carefully as they explain the legal
              relationship between you and us and will govern your use of the
              Platform and the services made available through it. By accessing
              or using the Platform and/or any content, materials or services
              made available through it you are agreeing to be legally bound by
              these Terms.
            </p>

            <p>
              We reserve the right to change these Terms from time to time in
              our sole discretion. Your use of the Platform will be subject to
              the most recent version of the Terms posted on the Platform at the
              time of such use. We recommend that you read through the Terms
              available on the Platform from time to time, so that you can be
              sure that you are aware of the latest version.
            </p>

            <h5>Registration</h5>
            <p>
              You do not need to register as a member of the Platform in order
              to browse some sections of the Site, but you may not be able to
              access all of the features of the Platform unless you register
              with us and create an account on the Platform. If you are browsing
              the Site and have not yet registered with us we will consider you
              a “Guest”, but your use of the Site will still be subject to these
              Terms.
            </p>

            <p>
              You will need to register with us in order to post any adverts on
              the Platform. You can register by clicking on the "Register" on
              our homepage and submitting the information required. You’ll need
              to provide a valid email address and a password, which you will be
              required to submit each time you log into the Platform. You may
              also be required to submit some additional personal information
              about yourself as part of the registration process. Once you
              register, you will be considered a "User".
            </p>

            <h5>Access and use of the Platform</h5>
            <p>
              1. We do not charge any fees for registering an account with us.
              Some aspects of the Platform are also made available free of
              charge, such as placing standard adverts and browsing and
              searching on the Platform.
              <br />
              2. We also offer a number of additional features and functionality
              on the Platform that are only available to members who have paid
              to upgrade their account. For more details on how to upgrade your
              account please refer to section 5 below.
            </p>

            <h5>3. Account Registration</h5>
            <p>
              To access certain features, you may need to register for an
              account. You are responsible for maintaining the confidentiality
              of your login information and all activities that occur under your
              account.
            </p>

            <h5>4. User Conduct</h5>
            <ul style={{ paddingLeft: "20px" }}>
              <li>No spamming, harassment, or abuse.</li>
              <li>No posting of false or misleading content.</li>
              <li>No illegal activity or violation of laws.</li>
            </ul>

            <h5>5. Termination</h5>
            <p>
              We reserve the right to suspend or terminate your access to the
              Service at our discretion, without notice, for conduct that we
              believe violates these Terms.
            </p>

            <h5>6. Changes to Terms</h5>
            <p>
              We may update these Terms occasionally. Continued use of the
              Service means you accept any changes.
            <br/>
              If you have any questions regarding these Terms, please contact us
              via our contact page.
            </p>
            <h5>Data Protection and Privacy</h5>
            <p>
              We will only use any personal information that we may collect
              about you in accordance with our Privacy policy. Our privacy
              policy is an important part of these Terms and it is important
              that you read it. By accepting these Terms you also accept and
              consent to our use of your personal data in accordance with our
              privacy policy.
            </p>
            <h5>General</h5>
            <p>
              1. These Terms and our privacy policy set out the full extent of
              our obligations and liabilities concerning the Platform and the
              services offered through it and replace any previous agreements
              and understandings between us and you.
              <br />
              2. Subject to section 10.1, you shall have no remedy in respect of
              any untrue statement made to you upon which you relied in entering
              into these Terms other than for any breach of our express
              obligations set out in these Terms.
              <br />
              3. These Terms do not create or infer any rights that are
              enforceable by any person who is not party to them.
              <br />
              4. You may not assign, sub-license or otherwise transfer any of
              your rights and obligations in these Terms to any other person.
              <br />
              5. If we decide not to exercise or enforce any right that we have
              against you at a particular time, then this does not prevent us
              from later deciding to exercise or enforce that right.
              <br />
              6. If any part of these Terms is found to be illegal, invalid or
              otherwise unenforceable by a court or regulator, then, where
              required, that part shall be deleted from the Terms and the
              remaining parts of the Terms will continue to be enforceable.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermsOfuse;
