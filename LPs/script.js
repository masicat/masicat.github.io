async function getTopics() {
    if (!document.hasStorageAccess) {
        console.warn("Topics API not available in this browser");
        return;
    }

    try {
        const topics = await document.browsingTopics();
        console.log("Retrieved topics:", topics);

        if (topics.length === 0) {
            document.getElementById("topics-list").innerHTML = "<li>No topics available</li>";
            return;
        }

        // Store topics in localStorage
        localStorage.setItem("user_topics", JSON.stringify(topics));

        // Display topics
        const list = document.getElementById("topics-list");
        list.innerHTML = "";
        topics.forEach(topic => {
            const li = document.createElement("li");
            li.textContent = `Topic ID: ${topic.topic}, Taxonomy: ${topic.taxonomyVersion}`;
            list.appendChild(li);
        });
    } catch (error) {
        console.error("Error fetching Topics API:", error);
    }
}

// Call function on page load
document.addEventListener("DOMContentLoaded", getTopics);
