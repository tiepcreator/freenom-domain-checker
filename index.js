const div = document.getElementById("app");

document.getElementById("button").onclick = function () {
  div.innerHTML = "";
  fetch("https://my.freenom.com/includes/domains/fn-available.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `domain=${document.getElementById("domain").value}&tld=`,
  })
    .then((res) => res.json())
    .then((data) => {
      Object.entries(data.free_domains).forEach((value) => {
        const p = document.createElement("p");
        if (value[1].status === "AVAILABLE" && value[1].type === "FREE") {
          p.innerHTML = `<a class="available" href="https://my.freenom.com/domains.php?a=availability&domain=${value[1].domain}${value[1].tld}">${value[1].domain}${value[1].tld} is available!</a>`;
          p.classList.add("available");
          div.appendChild(p);
        } else if (value[1].status === "AVAILABLE" && value[1].type !== "FREE") {
          p.innerHTML = `<a class="paid" href="https://my.freenom.com/domains.php?a=availability&domain=${value[1].domain}${value[1].tld}">${value[1].domain}${value[1].tld} is available but costs ${value[1].price_int} ${value[1].currency}</a>`;
          p.classList.add("paid");
          div.appendChild(p);
        } else {
          p.innerHTML = `${value[1].domain}${value[1].tld} isn't available.`;
          p.classList.add("unavailable");
          div.appendChild(p);
        }
      });
    });
};
