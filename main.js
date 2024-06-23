document.addEventListener("DOMContentLoaded", function () {
  const apiUrl =
    "https://8pv6xe9y.api.sanity.io/v2022-03-07/data/query/production";

  // Fetch home_aboutUs data
  const aboutUsQuery = encodeURIComponent(`*[_type == "home_aboutUs"][0]{
    title,
    description,
    text_content,
    image {
      asset->{
        url
      },
      alt
    }
  }`);

  fetch(`${apiUrl}?query=${aboutUsQuery}`)
    .then((response) => response.json())
    .then((result) => {
      updateAboutUsSection(result.result);
    })
    .catch((error) => console.error("Error fetching About Us data:", error));

  // Fetch homepageContent data
  const homepageContentQuery = `*[_type == "homepageContent"][0]{
    titleOne,
    titleTwo,
    titleThree,
    headerDescription
  }`;

  fetch(`${apiUrl}?query=${encodeURIComponent(homepageContentQuery)}`)
    .then((response) => response.json())
    .then((result) => {
      updateHomepageContent(result.result);
    })
    .catch((error) =>
      console.error("Error fetching Homepage Content data:", error)
    );
});

function updateAboutUsSection(data) {
  if (!data) {
    console.error("No data returned from Sanity API");
    return;
  }

  // Update the title and description
  document.getElementById("about-title").innerHTML = `About <span>Us</span>`;
  document.getElementById("about-description").textContent = data.description;

  // Update the content with blocks of text
  const textContainer = document.getElementById("about-text");
  textContainer.innerHTML = ""; // Clear existing content
  if (data.text_content) {
    data.text_content.forEach((block) => {
      const p = document.createElement("p");
      p.textContent = block.children.map((child) => child.text).join(" ");
      textContainer.appendChild(p);
    });
  }

  // Update the image
  const aboutImage = document.getElementById("about-image");
  if (data.image && data.image.asset) {
    aboutImage.src = data.image.asset.url;
    aboutImage.alt = data.image.alt || "About Us";
  }
}

function updateHomepageContent(data) {
  if (!data) {
    console.error("No data returned from Sanity API");
    return;
  }

  // Update the title and description
  document.getElementById("slide-3238-layer-1").innerHTML = data.titleOne;
  document.getElementById("slide-3238-layer-15").innerHTML = data.titleTwo;
  document.getElementById("slide-3238-layer-16").innerHTML = data.titleThree;
  document.getElementById("slide-3238-layer-2").innerHTML =
    data.headerDescription;
}

//-------- counter--------
document.addEventListener("DOMContentLoaded", function () {
  const apiUrl =
    "https://8pv6xe9y.api.sanity.io/v2022-03-07/data/query/production";
  const rateCounterQuery = encodeURIComponent(`*[_type == "rateCounter"]{
    iconClass,
    counterValue,
    title,
    symbol
  }`);

  fetch(`${apiUrl}?query=${rateCounterQuery}`)
    .then((response) => response.json())
    .then((result) => {
      updateCounterSection(result.result);
    })
    .catch((error) =>
      console.error("Error fetching Rate Counter data:", error)
    );
});

function updateCounterSection(data) {
  if (!data) {
    console.error("No data returned from Sanity API");
    return;
  }

  const counterRow = document.getElementById("counterRow");
  counterRow.innerHTML = ""; // Clear existing content

  data.forEach((counter) => {
    const counterColumn = document.createElement("div");
    counterColumn.className =
      "counter-column col-lg-3 col-md-6 col-sm-6 col-xs-12";

    const countIcon = document.createElement("div");
    countIcon.className = "count_icon";
    const icon = document.createElement("i");
    icon.className = counter.iconClass;
    countIcon.appendChild(icon);

    const counterContent = document.createElement("div");
    counterContent.className = "counter_content";

    const h2 = document.createElement("h2");
    const span = document.createElement("span");
    span.className = "counter";
    span.textContent = counter.counterValue;
    h2.appendChild(span);

    const symbol = document.createElement("span");
    symbol.textContent = counter.symbol || ""; // Default to empty if no symbol
    h2.appendChild(symbol);

    const title = document.createElement("div");
    title.className = "title";
    title.textContent = counter.title;

    counterContent.appendChild(h2);
    counterContent.appendChild(title);
    counterColumn.appendChild(countIcon);
    counterColumn.appendChild(counterContent);

    counterRow.appendChild(counterColumn);
  });
}

/// ------ end of counter

///--------service--------
document.addEventListener("DOMContentLoaded", function () {
  const projectId = "8pv6xe9y"; // Replace with your actual project ID
  const dataset = "production"; // Replace with your dataset if different
  const apiUrl = `https://${projectId}.api.sanity.io/v2022-03-07/data/query/${dataset}`;

  const servicesQuery = `*[_type == "service"]{
    iconClass,
    title,
    description
  }`;

  fetch(`${apiUrl}?query=${encodeURIComponent(servicesQuery)}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((result) => {
      updateServicesSection(result.result);
      initializeOwlCarousel(); // Initialize Owl Carousel after updating services
    })
    .catch((error) => console.error("Error fetching services data:", error));
});

function truncateText(text, maxWords) {
  const words = text.split(" ");
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(" ") + "...";
  } else {
    return text;
  }
}

function updateServicesSection(services) {
  const serviceSlider = document.querySelector(".service-slider");
  serviceSlider.innerHTML = ""; // Clear existing content

  services.forEach((service) => {
    const serviceCard = document.createElement("div");
    serviceCard.className = "item service-card";

    const serviceIcon = document.createElement("div");
    serviceIcon.className = "service_icon";
    const icon = document.createElement("i");
    icon.className = service.iconClass;
    serviceIcon.appendChild(icon);

    const serviceDetail = document.createElement("div");
    serviceDetail.className = "service_detail";

    const h5 = document.createElement("h5");
    const link = document.createElement("a");
    link.href = `service-detail.html?title=${encodeURIComponent(
      service.title
    )}`;
    link.title = service.title;
    link.textContent = service.title;
    h5.appendChild(link);

    const p = document.createElement("p");
    p.textContent = truncateText(service.description, 25); // Truncate description to 15 words

    serviceDetail.appendChild(h5);
    serviceDetail.appendChild(p);
    serviceCard.appendChild(serviceIcon);
    serviceCard.appendChild(serviceDetail);
    serviceSlider.appendChild(serviceCard);
  });
}

function initializeOwlCarousel() {
  $(".service-slider").owlCarousel({
    loop: true,
    margin: 20,
    nav: true,
    dots: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  });
}

//----end of service-----

/// aboutUs
document.addEventListener("DOMContentLoaded", function () {
  const apiUrl =
    "https://8pv6xe9y.api.sanity.io/v2022-03-07/data/query/production";

  // Fetch aboutUs data
  const aboutUsQuery = encodeURIComponent(`*[_type == "aboutUs"][0] {
    title,
    paragraph1,
    paragraph2,
    paragraph3,
    image {
      asset->{
        url
      },
      alt
    }
  }`);

  fetch(`${apiUrl}?query=${aboutUsQuery}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((result) => {
      updateAboutUsContent(result.result); // Changed function name here
    })
    .catch((error) => {
      console.error("Error fetching About Us data:", error);
    });
});

function updateAboutUsContent(data) {
  // Changed function name here
  if (!data) {
    console.error("No data returned from Sanity API");
    return;
  }

  // Update the title and paragraphs
  const aboutHeading = document.querySelector(".about-heading");
  aboutHeading.innerHTML = `About <span>Us</span>`;

  const paragraphs = document.querySelectorAll(".content-area p");
  paragraphs[0].textContent = data.paragraph1 || "";
  paragraphs[1].textContent = data.paragraph2 || "";
  paragraphs[2].textContent = data.paragraph3 || "";

  // Update the image
  const aboutImage = document.querySelector(".img-area img");
  if (data.image && data.image.asset) {
    aboutImage.src = data.image.asset.url;
    aboutImage.alt = data.image.alt || "About Image";
  }
}

// end aboutUs

//qualities
document.addEventListener("DOMContentLoaded", function () {
  const apiUrl =
    "https://8pv6xe9y.api.sanity.io/v2022-03-07/data/query/production";

  // Fetch qualities data
  const qualitiesQuery = encodeURIComponent(`*[_type == "qualities"]`);

  fetch(`${apiUrl}?query=${qualitiesQuery}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      updateQualitiesSection(data.result); // Call the function to update qualities section
    })
    .catch((error) => {
      console.error("Error fetching Qualities data:", error);
    });
});

function updateQualitiesSection(qualities) {
  const qualitiesRow = document.getElementById("qualities-row");

  if (!qualities || qualities.length === 0) {
    console.error("No qualities data returned from Sanity API");
    return;
  }

  qualities.forEach((quality) => {
    // Create column div for each quality
    const columnDiv = document.createElement("div");
    columnDiv.classList.add(
      "col-lg-3",
      "col-md-6",
      "col-sm-6",
      "col-xs-12",
      "column"
    );

    // Create icon div
    const iconDiv = document.createElement("div");
    iconDiv.classList.add("icon");
    const iconElement = document.createElement("i");

    // Split the icon classes if there are multiple
    const iconClasses = quality.icon.split(" ");
    iconClasses.forEach((cls) => iconElement.classList.add(cls));

    iconDiv.appendChild(iconElement);

    // Create heading div
    const headingDiv = document.createElement("div");
    headingDiv.classList.add("heading");
    const headingElement = document.createElement("h5");
    headingElement.textContent = quality.title;
    headingDiv.appendChild(headingElement);

    // Create description div
    const descriptionDiv = document.createElement("div");
    descriptionDiv.classList.add("description");
    const descriptionParagraph = document.createElement("p");
    descriptionParagraph.textContent = quality.description;
    descriptionDiv.appendChild(descriptionParagraph);

    // Append icon, heading, and description to column div
    columnDiv.appendChild(iconDiv);
    columnDiv.appendChild(headingDiv);
    columnDiv.appendChild(descriptionDiv);

    // Append column div to qualitiesRow
    qualitiesRow.appendChild(columnDiv);
  });
}
// end qualities

/// our team
document.addEventListener("DOMContentLoaded", function () {
  const apiUrl =
    "https://8pv6xe9y.api.sanity.io/v2022-03-07/data/query/production";

  // Fetch team data
  const teamQuery = encodeURIComponent(`*[_type == "ourTeam"]{ 
    name,
    position,
    description,
    social,
    "imageUrl": image.asset->url
  }`);

  fetch(`${apiUrl}?query=${teamQuery}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((result) => {
      updateTeamSection(result.result); // Call function to update team section
    })
    .catch((error) => {
      console.error("Error fetching Team data:", error);
    });
});

async function updateTeamSection(data) {
  const teamSlider = document.querySelector(".team-slider");

  for (const member of data) {
    const imageUrl = member.imageUrl || ""; // Check if imageUrl exists
    const name = member.name || "";
    const position = member.position || "";
    const description = member.description || "";
    const socialLinks = member.social || {};

    // Create elements dynamically for each team member
    const teamMember = document.createElement("div");
    teamMember.classList.add("item", "team-card");

    teamMember.innerHTML = `
      <div class="client_dp">
        <img src="${imageUrl}" alt="${name}" class="team-member-image" />
      </div>
      <div class="name_designation">
        <h5><a href="team-member-detail.html">${name}</a></h5>
        <span>${position}</span>
      </div>
      <div class="description">
        <p>${description}</p>
      </div>
      <div class="social_links">
        <ul>
          <li><a href="${
            socialLinks.facebook || "#"
          }" title="Facebook"><i class="flat flaticon-facebook-logo"></i></a></li>
          <li><a href="${
            socialLinks.twitter || "#"
          }" title="Twitter"><i class="flat flaticon-twitter"></i></a></li>
          <li><a href="${
            socialLinks.linkedin || "#"
          }" title="Linkedin"><i class="flat flaticon-linkedin-logo"></i></a></li>
          <li><a href="${
            socialLinks.instagram || "#"
          }" title="Instagram"><i class="flat flaticon-instagram"></i></a></li>
        </ul>
      </div>
    `;

    teamSlider.appendChild(teamMember);

    // Log image URL and element HTML for debugging
    console.log("Image URL:", imageUrl);
    console.log(
      "Image Element:",
      teamMember.querySelector(".client_dp img").outerHTML
    );
  }

  // Reinitialize Owl Carousel after adding all team members
  $(".team-slider").owlCarousel({
    loop: true,
    margin: 30,
    nav: false,
    dots: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  });

  // Trigger refresh for Owl Carousel to ensure proper display
  $(".team-slider").trigger("refresh.owl.carousel");
}

// ourTeam

/// testimonials

document.addEventListener("DOMContentLoaded", function () {
  const apiUrl =
    "https://8pv6xe9y.api.sanity.io/v2022-03-07/data/query/production";

  // Query to fetch testimonials
  const testimonialsQuery = encodeURIComponent(`*[_type == "testimonial"]{
    _id,
    comment,
    clientName,
    designation,
    clientImage {
      asset->{
        url
      }
    }
  }`);

  fetch(`${apiUrl}?query=${testimonialsQuery}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((result) => {
      console.log("Sanity API result:", result); // Debug: Log the result to the console
      updateTestimonialsSlider(result.result.slice(0, 3)); // Limit to three testimonials
    })
    .catch((error) => {
      console.error("Error fetching testimonials data:", error);
    });
});

function updateTestimonialsSlider(data) {
  if (!data || !Array.isArray(data)) {
    console.error("Invalid data returned from Sanity API");
    return;
  }

  console.log("Testimonials data:", data); // Debug: Log the data to the console

  const testimonialsSlider = document.querySelector(
    ".testimonials-slider.owl-carousel"
  );
  testimonialsSlider.innerHTML = ""; // Clear existing content

  data.forEach((testimonial) => {
    if (
      testimonial.clientImage &&
      testimonial.clientImage.asset &&
      testimonial.clientImage.asset.url
    ) {
      console.log("Adding image:", testimonial.clientImage.asset.url); // Debug: Log each image URL
      const div = document.createElement("div");
      div.classList.add("item");
      const commentDiv = document.createElement("div");
      commentDiv.classList.add("comment");
      commentDiv.innerHTML = `<p>${testimonial.comment}</p>`;
      const clientDetailDiv = document.createElement("div");
      clientDetailDiv.classList.add("client_detail");
      const clientImageDiv = document.createElement("div");
      clientImageDiv.classList.add("client_dp");
      const img = document.createElement("img");
      img.src = testimonial.clientImage.asset.url;
      img.alt = "Client DP";
      clientImageDiv.appendChild(img);
      const nameDesignationDiv = document.createElement("div");
      nameDesignationDiv.classList.add("name_designation");
      nameDesignationDiv.innerHTML = `<h5>${testimonial.clientName}</h5><span>${testimonial.designation}</span>`;
      clientDetailDiv.appendChild(clientImageDiv);
      clientDetailDiv.appendChild(nameDesignationDiv);
      div.appendChild(commentDiv);
      div.appendChild(clientDetailDiv);
      testimonialsSlider.appendChild(div);
    } else {
      console.warn("Missing image data for testimonial:", testimonial);
    }
  });

  // Reinitialize the carousel (ensure jQuery and Owl Carousel are loaded correctly)
  $(document).ready(function () {
    $(".testimonials-slider").owlCarousel({
      loop: true,
      margin: 10,
      nav: true,
      responsive: {
        0: { items: 1 },
        600: { items: 2 },
        1000: { items: 3 },
      },
    });
  });
}

//footer contacts

const fetchFooterContacts = async () => {
  const apiUrl =
    'https://8pv6xe9y.api.sanity.io/v2022-03-07/data/query/production?query=*[_type == "footerContacts"]';

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    return result.result[0];
  } catch (error) {
    console.error("Error fetching footer contact data:", error);
  }
};

// Update the footer contacts in the DOM
const updateFooterContacts = (data) => {
  if (!data) {
    console.error("Invalid data received");
    return;
  }

  // Update contact info
  document.querySelector(".contact_info ul").innerHTML = `
    <li>
      <i class="flat flaticon-facebook-placeholder-for-locate-places-on-maps"></i>
      ${data.address}
    </li>
    <li>
      <i class="flat flaticon-phone-receiver"></i>
      ${data.telephone}
    </li>
    <li>
      <i class="flat flaticon-mail-black-envelope-symbol"></i>
      ${data.email}
    </li>
  `;

  // Update social media links
  document.querySelector(".follow_us_on").innerHTML = `
    <a href="${data.facebook}" target="_blank"><i class="flat flaticon-facebook-logo"></i></a>
    <a href="${data.twitter}" target="_blank"><i class="flat flaticon-twitter"></i></a>
    <a href="${data.linkedin}" target="_blank"><i class="flat flaticon-linkedin-logo"></i></a>
    <a href="${data.instagram}" target="_blank"><i class="flat flaticon-instagram"></i></a>
  `;
};

// Initialize the footer contacts on page load
document.addEventListener("DOMContentLoaded", async () => {
  const footerContactsData = await fetchFooterContacts();
  updateFooterContacts(footerContactsData);
});

/// end of footer info

/// contact us page info

// contact.js

const fetchContactInfo = async () => {
  const apiUrl =
    'https://8pv6xe9y.api.sanity.io/v2022-03-07/data/query/production?query=*[_type == "footerContacts"]';

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    return result.result[0];
  } catch (error) {
    console.error("Error fetching contact data:", error);
  }
};

// Update the contact info in the DOM
const updateContactInfo = (data) => {
  if (!data) {
    console.error("Invalid data received");
    return;
  }

  const contactInfoList = document.querySelector(".info ul");

  // Clear the current content
  contactInfoList.innerHTML = "";

  // Add phone info
  const phoneItem = document.createElement("li");
  phoneItem.innerHTML = `
    <div class="icon">
      <i class="flat flaticon-phone-receiver"></i>
    </div>
    <div class="content">
      <div class="label">Phone No.</div>
      <div class="value">${data.telephone}</div>
    </div>
  `;
  contactInfoList.appendChild(phoneItem);

  // Add email info
  const emailItem = document.createElement("li");
  emailItem.innerHTML = `
    <div class="icon">
      <i class="flat flaticon-mail-black-envelope-symbol"></i>
    </div>
    <div class="content">
      <div class="label">Email Id</div>
      <div class="value">${data.email}</div>
    </div>
  `;
  contactInfoList.appendChild(emailItem);

  // Add address info
  const addressItem = document.createElement("li");
  addressItem.innerHTML = `
    <div class="icon">
      <i class="flat flaticon-facebook-placeholder-for-locate-places-on-maps"></i>
    </div>
    <div class="content">
      <div class="label">Address</div>
      <div class="value">${data.address}</div>
    </div>
  `;
  contactInfoList.appendChild(addressItem);
};

// Initialize the script and fetch data on page load
document.addEventListener("DOMContentLoaded", async () => {
  const contactInfo = await fetchContactInfo();
  updateContactInfo(contactInfo);
});

// end contact info

/// map

const fetchMapIFrame = async () => {
  const apiUrl =
    'https://8pv6xe9y.api.sanity.io/v2022-03-07/data/query/production?query=*[_type == "locationMap"]';

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    return result.result[0].iframeCode;
  } catch (error) {
    console.error("Error fetching map iframe data:", error);
    return null;
  }
};

const updateMapIFrame = (iframeCode) => {
  if (!iframeCode) {
    console.error("Invalid iframe code received");
    return;
  }

  const mapElement = document.getElementById("map");
  if (!mapElement) {
    console.error("Map element not found");
    return;
  }

  mapElement.innerHTML = iframeCode;
};

document.addEventListener("DOMContentLoaded", async () => {
  const iframeCode = await fetchMapIFrame();
  updateMapIFrame(iframeCode);
});

/// end map

//  job openings
// Function to fetch job openings from Sanity API
const fetchJobOpenings = async () => {
  const apiUrl =
    "https://8pv6xe9y.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type+%3D%3D+%22jobOpening%22%5D%0A";

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    return result.result || [];
  } catch (error) {
    console.error("Error fetching job openings:", error);
    return [];
  }
};

// Function to update the job openings count in the DOM
const updateJobOpeningsCount = (count) => {
  const countElement = document.getElementById("count");
  if (countElement) {
    countElement.textContent = count;
  }
};

// Function to render job listings on the webpage
const renderJobListings = (jobOpenings) => {
  const jobListingsContainer = document.getElementById("jobListings");
  if (!jobListingsContainer) {
    console.error("Job listings container not found");
    return;
  }

  jobListingsContainer.innerHTML = jobOpenings
    .map(
      (job) => `
        <article class="job-box d-md-flex align-items-center justify-content-between mb-30">
          <div class="job-left my-4 d-md-flex align-items-center flex-wrap">
            <div class="job-content">
              <h5 class="text-center text-md-left">${job.title}</h5>
              <ul class="d-md-flex flex-wrap text-capitalize ff-open-sans">
                <li class="mr-md-4 job-detail"><i class="zmdi zmdi-pin mr-2"></i> ${job.location}</li>
                <li class="mr-md-4 job-detail"><i class="zmdi zmdi-money mr-2"></i> $${job.salary}/pm</li>
                <li class="mr-md-4 job-detail"><i class="zmdi zmdi-time mr-2"></i> ${job.employmentType}</li>
              </ul>
              <p>${job.description}</p>
            </div>
          </div>
          <div class="job-right my-4 flex-shrink-0">
            <a href="${job.applicationLink}" class="btn d-block w-100 d-sm-inline-block btn-light" target="_blank">Apply now</a>
          </div>
        </article>
      `
    )
    .join("");
};

// Function to filter job openings based on keywords
const filterJobOpenings = (jobOpenings, keywords) => {
  if (!keywords) {
    return jobOpenings;
  }

  const filteredJobs = jobOpenings.filter((job) =>
    job.title.toLowerCase().includes(keywords.toLowerCase())
  );
  return filteredJobs;
};

// Function to handle search button click
const handleSearch = async () => {
  const keywords = document.getElementById("keywords").value.trim();
  const jobOpenings = await fetchJobOpenings();

  // Filter job openings based on keywords
  const filteredJobs = filterJobOpenings(jobOpenings, keywords);

  // Update job openings count and render filtered job listings
  updateJobOpeningsCount(filteredJobs.length);
  renderJobListings(filteredJobs);
};

// Event listener for search button click
document.addEventListener("DOMContentLoaded", async () => {
  // Initialize job openings on page load
  const jobOpenings = await fetchJobOpenings();
  updateJobOpeningsCount(jobOpenings.length);
  renderJobListings(jobOpenings);

  // Add event listener to search button
  const searchButton = document.getElementById("search-button");
  if (searchButton) {
    searchButton.addEventListener("click", handleSearch);
  }
});

/// end job
