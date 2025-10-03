import React from 'react';
import NavbarComponent from '../components/NavbarComponent';
import Footer from '../components/Footer';

// Define the new color palette
const colors = {
    primaryAccent: '#008080', // Teal/Cyan for headings
    background: '#f4f7f6', // Soft light grey background
    contentBox: '#ffffff', // White content box
    text: '#3c4043', // Dark grey text for readability
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)', // Softer, more pronounced shadow
};

// Define the updated styles object
const styles = {
  container: {
    // Apply the new background color to the area outside the content box
    backgroundColor: colors.background, 
    minHeight: '100vh', // Ensure the background covers the whole viewport
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
    // The margin-top must remain to account for the fixed navbar
    marginTop: '120px', 
  },
  contentBox: {
    maxWidth: '1100px',
    width: '100%',
    backgroundColor: colors.contentBox,
    padding: '30px 40px',
    borderRadius: '12px',
    // Use the new, softer shadow
    boxShadow: colors.boxShadow, 
    color: colors.text,
    lineHeight: '1.7',
    fontSize: '16px',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '30px',
    color: colors.primaryAccent, // Apply accent color to main heading
  },
  subHeading: {
    color: colors.primaryAccent, // Apply accent color to h4 section headers
    marginTop: '20px', // Add slight spacing above h4
    marginBottom: '10px',
  },
  list: {
    paddingLeft: '20px',
  },
  contactParagraph: {
    marginTop: '30px',
  }
};

const TermsOfuse = () => {
  return (
    <>
      {/* * We keep the dark blue navbar scheme from the previous request 
        * for contrast with the new light page theme.
      */}
      <NavbarComponent 
        colorScheme={{
          backgroundColor: '#003366', 
          textColor: '#ffffff'      
        }}
      /> 
      
      <div style={styles.container}>
        <div style={styles.contentBox}>
          <h2 style={styles.heading}>Terms of Use</h2>

          <section>
            <p>
              Welcome to RoomMate. These Terms of Use ("Terms") govern your access to and use of our website,
              services, and applications (collectively, the "Service"). Please read them carefully before using the Service.
            </p>

            <p>
              These terms and conditions (the "Terms") constitute a legally binding contract between you, the user, and us. Please take the time to read these Terms carefully as they explain the legal relationship between you and us and will govern your use of the Platform and the services made available through it. By accessing or using the Platform and/or any content, materials or services made available through it you are agreeing to be legally bound by these Terms.
            </p>

            <p>
              We reserve the right to change these Terms from time to time in our sole discretion. Your use of the Platform will be subject to the most recent version of the Terms posted on the Platform at the time of such use. We recommend that you read through the Terms available on the Platform from time to time, so that you can be sure that you are aware of the latest version.
            </p>

            <h4 style={styles.subHeading}>Registration</h4>
            <p>
              You do not need to register as a member of the Platform in order to browse some sections of the Site, but you may not be able to access all of the features of the Platform unless you register with us and create an account on the Platform. If you are browsing the Site and have not yet registered with us we will consider you a “Guest”, but your use of the Site will still be subject to these Terms.
            </p>

            <p>You will need to register with us in order to post any adverts on the Platform. You can register by clicking on the "Register" on our homepage and submitting the information required. You’ll need to provide a valid email address and a password, which you will be required to submit each time you log into the Platform. You may also be required to submit some additional personal information about yourself as part of the registration process. Once you register, you will be considered a "User".</p>

            <h4 style={styles.subHeading}>Access and use of the Platform</h4>
            <p>
              1. We do not charge any fees for registering an account with us. Some aspects of the Platform are also made available free of charge, such as placing standard adverts and browsing and searching on the Platform.
            </p>
            <p>2. We also offer a number of additional features and functionality on the Platform that are only available to members who have paid to upgrade their account. For more details on how to upgrade your account please refer to section 5 below.</p>

            <h4 style={styles.subHeading}>3. Account Registration</h4>
            <p>
              To access certain features, you may need to register for an account. You are responsible for maintaining
              the confidentiality of your login information and all activities that occur under your account.
            </p>

            <h4 style={styles.subHeading}>4. User Conduct</h4>
            <ul style={styles.list}>
              <li>No spamming, harassment, or abuse.</li>
              <li>No posting of false or misleading content.</li>
              <li>No illegal activity or violation of laws.</li>
            </ul>

            <h4 style={styles.subHeading}>5. Termination</h4>
            <p>
              We reserve the right to suspend or terminate your access to the Service at our discretion, without notice,
              for conduct that we believe violates these Terms.
            </p>

            <h4 style={styles.subHeading}>6. Changes to Terms</h4>
            <p>
              We may update these Terms occasionally. Continued use of the Service means you accept any changes.
            </p>

            <p style={styles.contactParagraph}>
              If you have any questions regarding these Terms, please contact us via our contact page.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermsOfuse;